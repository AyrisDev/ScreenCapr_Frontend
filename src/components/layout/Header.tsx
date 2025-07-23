"use client";

import Link from "next/link";
import { Camera, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { APP_CONFIG } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="flex top-0 z-50 w-full ">
      <div className="flex h-16 w-full ">
        {/* Logo and Brand */}
        <div className=" hidden md:flex items-center w-full justify-between mx-24">
          <Link
            href="/"
            className="mr-8 flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <Camera className="h-7 w-7 text-primary" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-primary rounded-full opacity-20" />
            </div>
            <span className=" font-bold text-xl sm:inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text ">
              {APP_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Screenshot
            </Link>
            <Link
              href="/batch"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/batch")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Batch Screenshots
            </Link>
          </nav>
        </div>
        <div className="w-full flex justify-between md:hidden items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-12 w-12" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px]">
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Single Screenshot
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/batch" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Batch Screenshots
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/"
            className="mr-8 flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <Camera className="h-7 w-7 text-primary" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-primary rounded-full opacity-20" />
            </div>
            <span className=" font-bold text-xl sm:inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text ">
              {APP_CONFIG.name}
            </span>
          </Link>
        </div>
        {/* Mobile Menu */}
      </div>
    </header>
  );
}
