export interface ViewportPreset {
  name: string;
  width: number;
  height: number;
  description: string;
}

export interface ScreenshotFormData {
  url: string;
  width: number;
  height: number;
  fullPage: boolean;
  format: 'png' | 'jpeg';
  quality: number;
  timeout: number;
}

export interface BatchScreenshotFormData {
  urls: string[];
  width: number;
  height: number;
  fullPage: boolean;
  format: 'png' | 'jpeg';
  quality: number;
  timeout: number;
}

export type ScreenshotStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ScreenshotResult {
  url: string;
  status: ScreenshotStatus;
  error?: string;
  downloadUrl?: string;
}