import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Documentation",
  description: "Complete API documentation for the Screenshot Tool backend service",
}

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          API Documentation
        </h1>
        <p className="text-lg text-muted-foreground">
          Complete reference for the Screenshot Tool backend API
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Base URL</h4>
            <code className="block p-3 bg-muted rounded-md text-sm">
              http://localhost:3000
            </code>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Content Type</h4>
            <code className="block p-3 bg-muted rounded-md text-sm">
              application/json
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">API Endpoints</h2>
        
        {/* Health Check */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Health Check</CardTitle>
              <Badge variant="secondary">GET</Badge>
            </div>
            <CardDescription>/api/health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Check if the API service is running and healthy.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Response</h4>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Single Screenshot */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Single Screenshot</CardTitle>
              <Badge>POST</Badge>
            </div>
            <CardDescription>/api/screenshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Capture a screenshot of a single website and return the image file.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Request Body</h4>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`{
  "url": "https://example.com",
  "options": {
    "width": 1920,
    "height": 1080,
    "fullPage": false,
    "format": "png",
    "quality": 90,
    "timeout": 30000
  }
}`}
              </pre>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Response</h4>
              <p className="text-sm text-muted-foreground">
                Binary image data (PNG or JPEG) with appropriate Content-Type header.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Batch Screenshots */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Batch Screenshots</CardTitle>
              <Badge>POST</Badge>
            </div>
            <CardDescription>/api/batch-screenshots</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Capture screenshots of multiple websites and return them as a ZIP archive.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Request Body</h4>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`{
  "urls": [
    "https://example1.com",
    "https://example2.com",
    "https://example3.com"
  ],
  "options": {
    "width": 1920,
    "height": 1080,
    "fullPage": false,
    "format": "png",
    "quality": 90,
    "timeout": 30000
  }
}`}
              </pre>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Response</h4>
              <p className="text-sm text-muted-foreground">
                Binary ZIP file containing all screenshots with Content-Type: application/zip.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Screenshot Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Screenshot Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Parameter</th>
                  <th className="text-left p-2 font-medium">Type</th>
                  <th className="text-left p-2 font-medium">Default</th>
                  <th className="text-left p-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2 font-mono">width</td>
                  <td className="p-2">number</td>
                  <td className="p-2">1920</td>
                  <td className="p-2">Viewport width in pixels (200-4000)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">height</td>
                  <td className="p-2">number</td>
                  <td className="p-2">1080</td>
                  <td className="p-2">Viewport height in pixels (200-4000)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">fullPage</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">Capture full page height</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">format</td>
                  <td className="p-2">string</td>
                  <td className="p-2">png</td>
                  <td className="p-2">Image format: &apos;png&apos; or &apos;jpeg&apos;</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">quality</td>
                  <td className="p-2">number</td>
                  <td className="p-2">90</td>
                  <td className="p-2">JPEG quality (1-100, only for jpeg format)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">timeout</td>
                  <td className="p-2">number</td>
                  <td className="p-2">30000</td>
                  <td className="p-2">Page load timeout in milliseconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Error Handling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The API returns appropriate HTTP status codes and error messages.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Common Error Responses</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="font-mono">400 Bad Request</span>
                  <span className="text-muted-foreground">Invalid URL or parameters</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="font-mono">408 Request Timeout</span>
                  <span className="text-muted-foreground">Page load timeout exceeded</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="font-mono">429 Too Many Requests</span>
                  <span className="text-muted-foreground">Rate limit exceeded</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="font-mono">500 Internal Server Error</span>
                  <span className="text-muted-foreground">Screenshot generation failed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limits & Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Recommendations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Implement client-side timeouts</li>
                <li>• Handle network errors gracefully</li>
                <li>• Use appropriate HTTP methods</li>
                <li>• Validate URLs before sending</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Limits</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Max 10 URLs per batch request</li>
                <li>• Max viewport size: 4000×4000</li>
                <li>• Max timeout: 120 seconds</li>
                <li>• Supported protocols: HTTP, HTTPS</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}