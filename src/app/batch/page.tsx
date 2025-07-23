import { BatchScreenshotForm } from "@/components/screenshot/BatchScreenshotForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Images, Zap, Package, Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Batch Screenshot Tool - Process Multiple URLs at Once",
  description: "Process up to 10 website screenshots simultaneously and download as a ZIP archive. Professional batch screenshot tool with parallel processing and high-quality results.",
  keywords: [
    "batch screenshot",
    "multiple screenshots",
    "bulk screenshot",
    "screenshot batch processing",
    "website batch capture",
    "zip screenshots",
    "multiple url screenshot"
  ],
  openGraph: {
    title: "Batch Screenshot Tool - Process Multiple URLs at Once",
    description: "Process up to 10 website screenshots simultaneously and download as a ZIP archive. Professional batch screenshot tool with parallel processing.",
  },
  twitter: {
    title: "Batch Screenshot Tool - Process Multiple URLs at Once", 
    description: "Process up to 10 website screenshots simultaneously and download as a ZIP archive. Professional batch screenshot tool with parallel processing.",
  }
}

export default function BatchPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header Section */}
      <section className="text-center space-y-6 py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Batch Screenshot Processing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Process up to 10 websites simultaneously and download all screenshots 
            in a convenient ZIP archive.
          </p>
        </div>
        
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <Package className="h-6 w-6 mx-auto text-primary" />
              <CardTitle className="text-sm">ZIP Archive</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs">
                All screenshots bundled in one download
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <Zap className="h-6 w-6 mx-auto text-primary" />
              <CardTitle className="text-sm">Parallel Processing</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs">
                Multiple URLs processed simultaneously
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <Shield className="h-6 w-6 mx-auto text-primary" />
              <CardTitle className="text-sm">Same Quality</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs">
                All customization options available
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Batch Screenshot Form */}
      <section>
        <BatchScreenshotForm />
      </section>

      {/* Usage Tips */}
      <section className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💡 Tips for Best Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <span className="font-medium text-foreground min-w-fit">•</span>
              <span>Use full URLs including https:// for better compatibility</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-foreground min-w-fit">•</span>
              <span>Limit to 10 URLs per batch for optimal performance</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-foreground min-w-fit">•</span>
              <span>Processing time varies based on website loading speeds</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-foreground min-w-fit">•</span>
              <span>All screenshots use the same options you configure</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}