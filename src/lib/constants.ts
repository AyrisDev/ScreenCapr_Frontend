import { ViewportPreset } from '@/types/screenshot';

// Use proxy routes in production to avoid CORS issues
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Use relative URLs for proxy routes
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const VIEWPORT_PRESETS: ViewportPreset[] = [
  {
    name: 'Mobile',
    width: 375,
    height: 667,
    description: 'iPhone SE'
  },
  {
    name: 'Mobile Large',
    width: 414,
    height: 896,
    description: 'iPhone 11 Pro Max'
  },
  {
    name: 'Tablet',
    width: 768,
    height: 1024,
    description: 'iPad'
  },
  {
    name: 'Desktop Small',
    width: 1024,
    height: 768,
    description: 'Small desktop'
  },
  {
    name: 'Desktop',
    width: 1920,
    height: 1080,
    description: 'Full HD'
  },
  {
    name: 'Desktop Large',
    width: 2560,
    height: 1440,
    description: '2K display'
  }
];

export const DEFAULT_SCREENSHOT_OPTIONS = {
  width: 1920,
  height: 1080,
  fullPage: false,
  format: 'png' as const,
  quality: 90,
  timeout: 30000
};

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Screenly',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  description: 'Professional website screenshot tool with batch processing capabilities'
};