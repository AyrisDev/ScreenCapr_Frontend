"use client";

import * as React from "react";

import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import type { BatchScreenshotFormData } from "@/lib/validations";

interface BatchUrlInputProps {
  form: UseFormReturn<BatchScreenshotFormData>;
}

export function BatchUrlInput({ form }: BatchUrlInputProps) {
  const [bulkText, setBulkText] = React.useState("");

  const handleBulkTextChange = (text: string) => {
    setBulkText(text);
    const urlList = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 10); // Limit to 10 URLs

    form.setValue("urls", urlList);
  };

  return (
    <div className="space-y-4">
      {/* Mode Selector */}

      {/* Bulk Text Input */}

      <FormField
        control={form.control}
        name="urls"
        render={() => (
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

      {/* URL Count Display */}
      {form.watch("urls")?.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {form.watch("urls").length} URL
          {form.watch("urls").length === 1 ? "" : "s"} ready for processing
        </div>
      )}
    </div>
  );
}
