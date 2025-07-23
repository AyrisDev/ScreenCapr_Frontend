import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import type { ScreenshotRequest } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: ScreenshotRequest = await request.json();
    const { url, options = {} } = body;

    if (!url) {
      return NextResponse.json(
        { message: 'URL is required' },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

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

    await browser.close();

    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': `image/${options.format || 'png'}`,
        'Content-Disposition': `attachment; filename="screenshot.${options.format || 'png'}"`,
      },
    });
  } catch (error) {
    console.error('Screenshot error:', error);
    return NextResponse.json(
      { message: 'Failed to capture screenshot' },
      { status: 500 }
    );
  }
}