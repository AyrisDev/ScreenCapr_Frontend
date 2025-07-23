import { z } from 'zod';

export const urlSchema = z.string()
  .url({ message: 'Please enter a valid URL' })
  .refine((url) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }, { message: 'URL must use HTTP or HTTPS protocol' });

export const screenshotOptionsSchema = z.object({
  width: z.number().min(200).max(4000).default(1920),
  height: z.number().min(200).max(4000).default(1080),
  fullPage: z.boolean().default(false),
  format: z.enum(['png', 'jpeg']).default('png'),
  quality: z.number().min(1).max(100).default(90),
  timeout: z.number().min(5000).max(120000).default(30000)
});

export const screenshotFormSchema = z.object({
  url: urlSchema,
  ...screenshotOptionsSchema.shape
});

export const batchScreenshotFormSchema = z.object({
  urls: z.array(urlSchema).min(1, 'At least one URL is required').max(10, 'Maximum 10 URLs allowed'),
  ...screenshotOptionsSchema.shape
});

export const urlListSchema = z.string()
  .transform((str) => {
    return str
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  })
  .pipe(z.array(urlSchema).min(1).max(10));

export type ScreenshotFormData = z.infer<typeof screenshotFormSchema>;
export type BatchScreenshotFormData = z.infer<typeof batchScreenshotFormSchema>;
export type ScreenshotOptions = z.infer<typeof screenshotOptionsSchema>;