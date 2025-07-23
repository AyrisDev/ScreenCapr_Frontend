import Link from "next/link"
import { Heart } from "lucide-react"
import { APP_CONFIG } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{" "}
            <Heart className="inline h-4 w-4 text-red-500" />{" "}
            using{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </Link>
            {" "}
            and{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <p className="text-sm text-muted-foreground">
            {APP_CONFIG.name} v{APP_CONFIG.version}
          </p>
        </div>
      </div>
    </footer>
  )
}