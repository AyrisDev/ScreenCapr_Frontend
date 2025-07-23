import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { APP_CONFIG } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  keywords: [
    "screenshot tool",
    "website screenshot",
    "batch screenshot",
    "screenshot capture",
    "web page screenshot",
    "screenshot generator",
    "website capture",
    "screenshot api",
    "screenshot service",
    "free screenshot tool"
  ],
  authors: [{ name: "Screenshot Tool Team" }],
  creator: "Screenshot Tool",
  publisher: "Screenshot Tool",
  applicationName: APP_CONFIG.name,
  generator: "Next.js",
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://screenshot-tool.com",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    siteName: APP_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Screenshot Tool - Professional Website Screenshot Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: ["/og-image.png"],
    creator: "@screenshottool",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://screenshot-tool.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": APP_CONFIG.name,
              "description": APP_CONFIG.description,
              "url": process.env.NEXT_PUBLIC_BASE_URL || "https://screenshot-tool.com",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Screenshot Tool Team"
              },
              "featureList": [
                "Website Screenshot Capture",
                "Batch Screenshot Processing",
                "Multiple Format Support",
                "Custom Viewport Sizes",
                "High Quality Downloads",
                "Privacy Focused"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
