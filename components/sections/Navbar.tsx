'use client'

import { NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">
            <span className="text-accent">EL</span>
            <span className="text-foreground"> SPACE</span>
          </div>
        </Link>

        {/* Nav Links - Hidden on mobile */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden border-accent text-accent hover:bg-accent/10 sm:flex"
          >
            Apply as Freelancer
          </Button>
          <Button
            size="sm"
            className="bg-amber-400 text-white hover:bg-amber-400/90"
          >
            Post a Job
          </Button>
        </div>
      </div>
    </nav>
  )
}
