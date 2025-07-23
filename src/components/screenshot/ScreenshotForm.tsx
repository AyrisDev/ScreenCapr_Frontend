"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Camera, Download, Loader2, Link, AlertCircle, CheckCircle2 } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useScreenshot } from "@/hooks/useScreenshot"
import { DEFAULT_SCREENSHOT_OPTIONS } from "@/lib/constants"
import { screenshotFormSchema, type ScreenshotFormData } from "@/lib/validations"
import { OptionsPanel } from "./OptionsPanel"

export function ScreenshotForm() {
  const [isOptionsExpanded, setIsOptionsExpanded] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  const form = useForm<ScreenshotFormData>({
    resolver: zodResolver(screenshotFormSchema),
    defaultValues: {
      url: "",
      ...DEFAULT_SCREENSHOT_OPTIONS,
    },
  })

  const screenshot = useScreenshot({
    onSuccess: (blob, variables) => {
      setSuccessMessage(`Screenshot of ${variables.url} downloaded successfully!`)
      form.reset({ ...form.getValues(), url: "" })
      setTimeout(() => setSuccessMessage(null), 5000)
    },
    onError: (error) => {
      console.error('Screenshot error:', error?.message || error || 'Unknown error')
    },
  })

  const onSubmit = (data: ScreenshotFormData) => {
    setSuccessMessage(null)
    const { url, ...options } = data
    screenshot.mutate({ url, options })
  }

  const urlValue = form.watch("url")
  const isValidUrl = urlValue && !form.formState.errors.url

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Website Screenshot Tool
          </CardTitle>
          <CardDescription>
            Enter a URL to capture a screenshot of any website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* URL Input */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <div className="relative">
                      <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quick Action Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={screenshot.isPending || !isValidUrl}
                  className="flex-1 sm:flex-none"
                >
                  {screenshot.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Taking Screenshot...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Take Screenshot
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
                  className="lg:hidden"
                >
                  Options
                </Button>
              </div>

              {/* Progress Bar */}
              {screenshot.isPending && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Capturing screenshot...</span>
                    <span>Please wait</span>
                  </div>
                  <Progress value={undefined} className="w-full" />
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
              {screenshot.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {screenshot.error.message || "Failed to take screenshot. Please try again."}
                  </AlertDescription>
                </Alert>
              )}

              {/* Options Panel - Inside the same form */}
              <div className="lg:block">
                <OptionsPanel
                  form={form}
                  isExpanded={isOptionsExpanded}
                  onToggleExpanded={() => setIsOptionsExpanded(!isOptionsExpanded)}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}