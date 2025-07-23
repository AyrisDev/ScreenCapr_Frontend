"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Images,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Package,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useBatchScreenshot } from "@/hooks/useBatchScreenshot";
import { DEFAULT_SCREENSHOT_OPTIONS } from "@/lib/constants";
import {
  batchScreenshotFormSchema,
  type BatchScreenshotFormData,
} from "@/lib/validations";
import { BatchUrlInput } from "./BatchUrlInput";
import { BatchOptionsPanel } from "./BatchOptionsPanel";

export function BatchScreenshotForm() {
  const [isOptionsExpanded, setIsOptionsExpanded] = React.useState(true);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const form = useForm<BatchScreenshotFormData>({
    resolver: zodResolver(batchScreenshotFormSchema),
    defaultValues: {
      urls: [],
      ...DEFAULT_SCREENSHOT_OPTIONS,
    },
  });

  const batchScreenshot = useBatchScreenshot({
    onSuccess: () => {
      const urlCount = form.getValues("urls").length;
      setSuccessMessage(
        `Successfully created ZIP archive with ${urlCount} screenshot${
          urlCount === 1 ? "" : "s"
        }!`
      );
      form.reset({ urls: [], ...DEFAULT_SCREENSHOT_OPTIONS });
      setTimeout(() => setSuccessMessage(null), 5000);
    },
    onError: (error) => {
      console.error("Batch screenshot error:", error);
    },
  });

  const onSubmit = (data: BatchScreenshotFormData) => {
    setSuccessMessage(null);
    const { urls, ...options } = data;
    batchScreenshot.mutate({ urls, options });
  };

  const urls = form.watch("urls") || [];
  const hasValidUrls = urls.length > 0 && !form.formState.errors.urls;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Images className="h-6 w-6" />
            Batch Screenshot Tool
          </CardTitle>
          <CardDescription>
            Process multiple URLs at once and download as a ZIP archive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* URL Input */}
              <BatchUrlInput form={form} />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={batchScreenshot.isPending || !hasValidUrls}
                  className="flex-1 sm:flex-none"
                >
                  {batchScreenshot.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing {urls.length} URL{urls.length === 1 ? "" : "s"}
                      ...
                    </>
                  ) : (
                    <>
                      <Package className="mr-2 h-4 w-4" />
                      Create ZIP Archive
                    </>
                  )}
                </Button>
              </div>

              {/* Progress Bar */}
              {batchScreenshot.isPending && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Processing screenshots...</span>
                    <span>
                      {urls.length} URL{urls.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <Progress value={undefined} className="w-full" />
                  <div className="text-xs text-muted-foreground text-center">
                    This may take a few moments depending on the number of URLs
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {batchScreenshot.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {batchScreenshot.error.message ||
                      "Failed to process batch screenshots. Please try again."}
                  </AlertDescription>
                </Alert>
              )}

              {/* URL Summary */}
              {urls.length > 0 && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Ready to process:</span>
                        <span className="text-muted-foreground">
                          {urls.length} URL{urls.length === 1 ? "" : "s"}
                        </span>
                      </div>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {urls.slice(0, 5).map((url, index) => (
                          <div
                            key={index}
                            className="text-xs text-muted-foreground truncate"
                          >
                            {index + 1}. {url}
                          </div>
                        ))}
                        {urls.length > 5 && (
                          <div className="text-xs text-muted-foreground">
                            ... and {urls.length - 5} more URL
                            {urls.length - 5 === 1 ? "" : "s"}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Options Panel - Inside the same form */}
              <div className="lg:block">
                <BatchOptionsPanel
                  form={form}
                  isExpanded={isOptionsExpanded}
                  onToggleExpanded={() =>
                    setIsOptionsExpanded(!isOptionsExpanded)
                  }
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
