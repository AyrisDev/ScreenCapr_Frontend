import Link from "next/link";
import { Camera, ExternalLink, Code, Zap } from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className=" py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mx-24">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Camera className="h-8 w-8 text-primary" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-primary rounded-full opacity-20" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text ">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6">
              {APP_CONFIG.description}. Fast, reliable, and privacy-focused
              screenshot service for developers, designers, and content
              creators.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Code className="h-4 w-4 text-primary" />
                <span>Developer Friendly</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Features</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Single Screenshots</li>
              <li>Batch Processing</li>
              <li>Custom Viewports</li>
              <li>Multiple Formats</li>
              <li>High Quality Output</li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Developer</h3>
            <div className="space-y-3">
              <Link
                href="https://ayris.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ExternalLink className="h-4 w-4 group-hover:text-primary" />
                <span>Ayris.tech</span>
              </Link>
              <p className="text-xs text-muted-foreground">
                Professional web development <br />
                and digital solutions
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8">
          <div className="flex  items-center justify-between gap-4 md:flex-row mx-24">
            <p className="text-sm text-muted-foreground">
              {APP_CONFIG.name} v{APP_CONFIG.version}
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} Developed by{" "}
              <Link
                href="https://ayris.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                Ayris.tech
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
