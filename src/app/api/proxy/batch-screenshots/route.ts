import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Calculate timeout based on number of URLs (allow 60s per URL + 60s buffer)
    const { urls = [] } = body;
    const timeoutMs = (urls.length * 60000) + 60000; // 60s per URL + 60s buffer
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const response = await fetch('https://screencapr_api.ayris.tech/api/batch-screenshots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/zip',
        'Content-Disposition': response.headers.get('Content-Disposition') || '',
      },
    });
  } catch (error) {
    console.error('Batch screenshots proxy error:', error);
    
    // More detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = {
      error: 'Failed to proxy batch screenshots request',
      details: errorMessage,
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(errorDetails, { status: 500 });
  }
}