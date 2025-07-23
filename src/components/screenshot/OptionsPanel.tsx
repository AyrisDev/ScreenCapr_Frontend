"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet, Settings2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { VIEWPORT_PRESETS } from "@/lib/constants";
import type { ScreenshotFormData } from "@/lib/validations";

interface OptionsPanelProps {
  form: UseFormReturn<ScreenshotFormData>;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export function OptionsPanel({
  form,
  isExpanded = false,
  onToggleExpanded,
}: OptionsPanelProps) {
  const formatValue = form.watch("format");
  const widthValue = form.watch("width");
  const heightValue = form.watch("height");

  const handlePresetSelect = (preset: (typeof VIEWPORT_PRESETS)[0]) => {
    form.setValue("width", preset.width);
    form.setValue("height", preset.height);
  };

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
              className="lg:hidden"
            >
              {isExpanded ? "Hide" : "Show"} Options
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent
        className={`space-y-6 ${!isExpanded ? "hidden lg:block" : ""}`}
      >
        {/* Viewport Presets */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Viewport Presets</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {VIEWPORT_PRESETS.map((preset) => {
              const isActive =
                widthValue === preset.width && heightValue === preset.height;
              const Icon = preset.name.includes("Mobile")
                ? Smartphone
                : preset.name.includes("Tablet")
                ? Tablet
                : Monitor;

              return (
                <Button
                  key={preset.name}
                  variant={isActive ? "outline" : "blanke"}
                  size="sm"
                  onClick={() => handlePresetSelect(preset)}
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{preset.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {preset.width}×{preset.height}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Custom Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1920"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1080"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Format and Quality */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Format</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="png">PNG (Lossless)</SelectItem>
                    <SelectItem value="jpeg">JPEG (Compressed)</SelectItem>
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
                  <FormLabel>JPEG Quality: {field.value}%</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Higher quality means larger file size
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Full Page Option */}
        <FormField
          control={form.control}
          name="fullPage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Full Page Screenshot
                </FormLabel>
                <FormDescription>
                  Capture the entire page, not just the viewport
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
              <FormLabel>Timeout (seconds): {field.value / 1000}s</FormLabel>

              <FormDescription>
                Maximum time to wait for page load
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
