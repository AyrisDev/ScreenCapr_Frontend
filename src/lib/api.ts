import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from './constants';
import type { ScreenshotRequest, BatchScreenshotRequest, HealthResponse, ApiError, ScreenshotOptions } from '@/types/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      timestamp: new Date().toISOString(),
    };
    return Promise.reject(apiError);
  }
);

export const downloadScreenshot = async (url: string, options?: ScreenshotOptions): Promise<Blob> => {
  const response = await apiClient.post('/api/screenshot', 
    { url, options },
    { 
      responseType: 'blob',
      timeout: (options?.timeout || 30000) + 10000 // Add 10s buffer
    }
  );
  return response.data;
};

export const downloadBatchScreenshots = async (urls: string[], options?: ScreenshotOptions): Promise<Blob> => {
  const response = await apiClient.post('/api/batch-screenshots',
    { urls, options },
    { 
      responseType: 'blob',
      timeout: ((options?.timeout || 30000) * urls.length) + 30000 // Timeout per URL + buffer
    }
  );
  return response.data;
};

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get('/api/health');
  return response.data;
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const generateFilename = (url: string, format: string, timestamp?: Date): string => {
  const domain = new URL(url).hostname.replace(/^www\./, '');
  const time = (timestamp || new Date()).toISOString().slice(0, 19).replace(/[:.]/g, '-');
  return `screenshot-${domain}-${time}.${format}`;
};

export const generateBatchFilename = (timestamp?: Date): string => {
  const time = (timestamp || new Date()).toISOString().slice(0, 19).replace(/[:.]/g, '-');
  return `screenshots-batch-${time}.zip`;
};