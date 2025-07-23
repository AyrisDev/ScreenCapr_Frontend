import { useMutation } from '@tanstack/react-query';
import { downloadBatchScreenshots, downloadFile, generateBatchFilename } from '@/lib/api';
import type { ScreenshotOptions, ApiError } from '@/types/api';

interface UseBatchScreenshotOptions {
  onSuccess?: (data: Blob) => void;
  onError?: (error: ApiError) => void;
}

export const useBatchScreenshot = (options?: UseBatchScreenshotOptions) => {
  return useMutation({
    mutationFn: async ({ urls, options: screenshotOptions }: { urls: string[]; options?: ScreenshotOptions }) => {
      return await downloadBatchScreenshots(urls, screenshotOptions);
    },
    onSuccess: (blob) => {
      const filename = generateBatchFilename();
      downloadFile(blob, filename);
      options?.onSuccess?.(blob);
    },
    onError: options?.onError,
  });
};