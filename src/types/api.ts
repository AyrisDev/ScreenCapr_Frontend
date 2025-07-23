export interface ScreenshotOptions {
  width?: number;
  height?: number;
  fullPage?: boolean;
  format?: 'png' | 'jpeg';
  quality?: number;
  timeout?: number;
}

export interface ScreenshotRequest {
  url: string;
  options?: ScreenshotOptions;
}

export interface BatchScreenshotRequest {
  urls: string[];
  options?: ScreenshotOptions;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
}