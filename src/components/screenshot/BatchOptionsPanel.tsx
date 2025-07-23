"use client"

import * as React from "react"
import { Monitor, Smartphone, Tablet, Settings2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { VIEWPORT_PRESETS } from "@/lib/constants"
import type { BatchScreenshotFormData } from "@/lib/validations"

interface BatchOptionsPanelProps {
  form: UseFormReturn<BatchScreenshotFormData>
  isExpanded?: boolean
  onToggleExpanded?: () => void
}

export function BatchOptionsPanel({ form, isExpanded = false, onToggleExpanded }: BatchOptionsPanelProps) {
  const formatValue = form.watch("format")
  const widthValue = form.watch("width")
  const heightValue = form.watch("height")

  const handlePresetSelect = (preset: typeof VIEWPORT_PRESETS[0]) => {
    form.setValue("width", preset.width)
    form.setValue("height", preset.height)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Screenshot Options
            </CardTitle>
            <CardDescription>
              Customize your screenshot settings
            </CardDescription>
          </div>
          {onToggleExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpanded}
            >
              {isExpanded ? "Hide" : "Show"} Options
            </Button>
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Viewport Presets */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Presets</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {VIEWPORT_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  variant={
                    widthValue === preset.width && heightValue === preset.height
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="h-auto flex-col gap-1 p-3"
                  onClick={() => handlePresetSelect(preset)}
                  type="button"
                >
                  <div className="flex items-center gap-1">
                    {preset.name.includes('Mobile') && <Smartphone className="h-3 w-3" />}
                    {preset.name.includes('Tablet') && <Tablet className="h-3 w-3" />}
                    {preset.name.includes('Desktop') && <Monitor className="h-3 w-3" />}
                    <span className="text-xs font-medium">{preset.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {preset.width}×{preset.height}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (px)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1920"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1920)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (px)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1080"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1080)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Format and Quality */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {formatValue === "jpeg" && (
              <FormField
                control={form.control}
                name="quality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quality ({field.value}%)</FormLabel>
                    <FormControl>
                      <div className="px-3">
                        <Slider
                          min={1}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Full Page Toggle */}
          <FormField
            control={form.control}
            name="fullPage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Full Page Screenshot</FormLabel>
                  <FormDescription>
                    Capture the entire page instead of just the viewport
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Timeout */}
          <FormField
            control={form.control}
            name="timeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeout (seconds)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    value={field.value / 1000}
                    onChange={(e) => field.onChange((parseInt(e.target.value) || 30) * 1000)}
                  />
                </FormControl>
                <FormDescription>
                  Maximum time to wait for page to load
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      )}
    </Card>
  )
}