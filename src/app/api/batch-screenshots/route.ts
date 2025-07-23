import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import JSZip from 'jszip';
import type { BatchScreenshotRequest } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: BatchScreenshotRequest = await request.json();
    const { urls, options = {} } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { message: 'URLs array is required' },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const zip = new JSZip();
    const screenshots = await Promise.allSettled(
      urls.map(async (url, index) => {
        const page = await browser.newPage();
        
        if (options.width && options.height) {
          await page.setViewport({
            width: options.width,
            height: options.height
          });
        }

        await page.goto(url, { 
          waitUntil: 'networkidle2',
          timeout: options.timeout || 30000
        });

        const screenshot = await page.screenshot({
          type: options.format || 'png',
          quality: options.format === 'jpeg' ? options.quality || 90 : undefined,
          fullPage: options.fullPage || false
        });

        await page.close();

        const domain = new URL(url).hostname.replace(/^www\./, '');
        const filename = `screenshot-${domain}-${index + 1}.${options.format || 'png'}`;
        
        return { screenshot, filename };
      })
    );

    screenshots.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        zip.file(result.value.filename, result.value.screenshot);
      } else {
        console.error(`Failed to capture screenshot for ${urls[index]}:`, result.reason);
      }
    });

    await browser.close();

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="screenshots.zip"',
      },
    });
  } catch (error) {
    console.error('Batch screenshot error:', error);
    return NextResponse.json(
      { message: 'Failed to capture batch screenshots' },
      { status: 500 }
    );
  }
}