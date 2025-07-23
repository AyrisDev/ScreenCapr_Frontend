import { useMutation } from '@tanstack/react-query';
import { downloadScreenshot, downloadFile, generateFilename } from '@/lib/api';
import type { ScreenshotOptions, ApiError } from '@/types/api';

interface UseScreenshotOptions {
  onSuccess?: (data: Blob, variables: { url: string; options?: ScreenshotOptions }) => void;
  onError?: (error: ApiError) => void;
}

export const useScreenshot = (options?: UseScreenshotOptions) => {
  return useMutation({
    mutationFn: async ({ url, options: screenshotOptions }: { url: string; options?: ScreenshotOptions }) => {
      const blob = await downloadScreenshot(url, screenshotOptions);
      return { blob, url, options: screenshotOptions };
    },
    onSuccess: (data, variables) => {
      const filename = generateFilename(
        data.url, 
        data.options?.format || 'png'
      );
      downloadFile(data.blob, filename);
      options?.onSuccess?.(data.blob, variables);
    },
    onError: options?.onError,
  });
};

export const useScreenshotDownload = () => {
  return useMutation({
    mutationFn: downloadScreenshot,
    onSuccess: (blob, { url, options }) => {
      const filename = generateFilename(url, options?.format || 'png');
      downloadFile(blob, filename);
    },
  });
};