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
    default: `${APP_CONFIG.name} - Professional Website Screenshot Tool`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: `${APP_CONFIG.description}. Take high-quality screenshots of any website with custom viewports, batch processing, and instant downloads. Free, fast, and privacy-focused.`,
  keywords: [
    "screenly",
    "screenshot tool",
    "website screenshot",
    "batch screenshot",
    "screenshot capture",
    "web page screenshot",
    "screenshot generator",
    "website capture",
    "screenshot api",
    "screenshot service",
    "free screenshot tool",
    "ayris.tech",
    "web developer tools",
    "screenshot online",
    "website previews",
    "responsive screenshots",
    "full page screenshot",
    "mobile screenshot",
    "desktop screenshot",
  ],
  authors: [{ name: "Ayris.tech", url: "https://ayris.tech" }],
  creator: "Ayris.tech",
  publisher: "Ayris.tech",
  applicationName: APP_CONFIG.name,
  generator: "Next.js",
  viewport: "width=device-width, initial-scale=1",
  category: "Web Development Tools",
  classification: "Utility",
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
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://screenly.ayris.tech",
    title: `${APP_CONFIG.name} - Professional Website Screenshot Tool`,
    description: `${APP_CONFIG.description}. Take high-quality screenshots of any website with custom viewports and batch processing.`,
    siteName: APP_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.name} - Professional Website Screenshot Service by Ayris.tech`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.name} - Professional Website Screenshot Tool`,
    description: `${APP_CONFIG.description}. Take high-quality screenshots with custom viewports and batch processing.`,
    images: ["/og-image.png"],
    creator: "@ayristech",
    site: "@ayristech",
  },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_BASE_URL || "https://screenly.ayris.tech",
  },
  other: {
    "theme-color": "#3b82f6",
    "color-scheme": "light dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": APP_CONFIG.name,
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
              name: APP_CONFIG.name,
              alternateName: "Screenly Screenshot Tool",
              description: `${APP_CONFIG.description}. Take high-quality screenshots of any website with custom viewports, batch processing, and instant downloads.`,
              url:
                process.env.NEXT_PUBLIC_BASE_URL ||
                "https://screenly.ayris.tech",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: APP_CONFIG.version,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              creator: {
                "@type": "Organization",
                name: "Ayris.tech",
                url: "https://ayris.tech",
                sameAs: ["https://ayris.tech"],
              },
              publisher: {
                "@type": "Organization",
                name: "Ayris.tech",
                url: "https://ayris.tech",
              },
              featureList: [
                "Website Screenshot Capture",
                "Batch Screenshot Processing",
                "Multiple Format Support (PNG, JPEG)",
                "Custom Viewport Sizes",
                "Mobile and Desktop Presets",
                "Full Page Screenshots",
                "High Quality Downloads",
                "Privacy Focused - No Storage",
                "Real-time Processing",
                "Free to Use",
              ],
              screenshot: "/og-image.png",
              installUrl:
                process.env.NEXT_PUBLIC_BASE_URL ||
                "https://screenly.ayris.tech",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "1",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
