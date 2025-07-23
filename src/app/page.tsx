import { ScreenshotForm } from "@/components/screenshot/ScreenshotForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Zap, Shield, Download } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Website Screenshot Tool - Instant & Professional",
  description: "Capture high-quality screenshots of any website instantly. Professional screenshot tool with batch processing, custom viewport sizes, and multiple formats. Free, secure, and privacy-focused.",
  keywords: [
    "free screenshot tool",
    "website screenshot",
    "screenshot generator",
    "capture website",
    "screenshot online",
    "batch screenshot",
    "professional screenshot"
  ],
  openGraph: {
    title: "Free Website Screenshot Tool - Instant & Professional",
    description: "Capture high-quality screenshots of any website instantly. Professional screenshot tool with batch processing, custom viewport sizes, and multiple formats.",
  },
  twitter: {
    title: "Free Website Screenshot Tool - Instant & Professional",
    description: "Capture high-quality screenshots of any website instantly. Professional screenshot tool with batch processing, custom viewport sizes, and multiple formats.",
  }
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Website Screenshot Tool
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Capture high-quality screenshots of any website instantly. 
            Professional tool with customizable options and batch processing.
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader className="text-center">
              <Zap className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Instant screenshots with optimized performance and reliable results
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data stays private. No storage, direct download to your device
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Download className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Batch Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Process multiple URLs at once and download as a ZIP archive
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Screenshot Tool */}
      <section>
        <ScreenshotForm />
      </section>
    </div>
  )
}
