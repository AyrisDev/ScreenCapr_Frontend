"use client"

import * as React from "react"
import { Plus, X, Link, Upload } from "lucide-react"
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { BatchScreenshotFormData } from "@/lib/validations"

interface BatchUrlInputProps {
  form: UseFormReturn<BatchScreenshotFormData>
}

export function BatchUrlInput({ form }: BatchUrlInputProps) {
  const [inputMode, setInputMode] = React.useState<'individual' | 'bulk'>('individual')
  const [bulkText, setBulkText] = React.useState('')
  const [urls, setUrls] = React.useState<string[]>([''])

  const addUrl = () => {
    if (urls.length < 10) {
      setUrls([...urls, ''])
    }
  }

  const removeUrl = (index: number) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index)
      setUrls(newUrls)
      form.setValue('urls', newUrls.filter(url => url.trim()))
    }
  }

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls]
    newUrls[index] = value
    setUrls(newUrls)
    form.setValue('urls', newUrls.filter(url => url.trim()))
  }

  const handleBulkTextChange = (text: string) => {
    setBulkText(text)
    const urlList = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 10) // Limit to 10 URLs
    
    form.setValue('urls', urlList)
  }

  const switchToIndividual = () => {
    const currentUrls = form.getValues('urls') || []
    setUrls(currentUrls.length > 0 ? currentUrls : [''])
    setInputMode('individual')
  }

  const switchToBulk = () => {
    const currentUrls = form.getValues('urls') || []
    setBulkText(currentUrls.join('\n'))
    setInputMode('bulk')
  }

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
        <Button
          type="button"
          variant={inputMode === 'individual' ? 'default' : 'ghost'}
          size="sm"
          onClick={switchToIndividual}
          className="flex-1"
        >
          <Link className="mr-2 h-4 w-4" />
          Individual URLs
        </Button>
        <Button
          type="button"
          variant={inputMode === 'bulk' ? 'default' : 'ghost'}
          size="sm"
          onClick={switchToBulk}
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          Bulk Input
        </Button>
      </div>

      {/* Individual URL Inputs */}
      {inputMode === 'individual' && (
        <div className="space-y-3">
          <Label>Website URLs (max 10)</Label>
          {urls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`https://example${index + 1}.com`}
                  value={url}
                  onChange={(e) => updateUrl(index, e.target.value)}
                  className="pl-10"
                />
              </div>
              {urls.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeUrl(index)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove URL</span>
                </Button>
              )}
            </div>
          ))}
          
          {urls.length < 10 && (
            <Button
              type="button"
              variant="outline"
              onClick={addUrl}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another URL
            </Button>
          )}
        </div>
      )}

      {/* Bulk Text Input */}
      {inputMode === 'bulk' && (
        <FormField
          control={form.control}
          name="urls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URLs (one per line, max 10)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`https://example1.com
https://example2.com
https://example3.com`}
                  value={bulkText}
                  onChange={(e) => handleBulkTextChange(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </FormControl>
              <div className="text-sm text-muted-foreground">
                Enter one URL per line. Maximum 10 URLs allowed.
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* URL Count Display */}
      {form.watch('urls')?.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {form.watch('urls').length} URL{form.watch('urls').length === 1 ? '' : 's'} ready for processing
        </div>
      )}
    </div>
  )
}