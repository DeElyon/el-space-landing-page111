'use client'

import { NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-40">
            <Image
              src="/logo.png"
              alt="EL SPACE"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Nav Links - Hidden on mobile */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons & Links */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Platform Links - Hidden on mobile */}
          <div className="hidden gap-3 lg:flex">
            <Link href="/auth/register">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Login
              </Button>
            </Link>
          </div>

          <Link href="/auth/register">
            <Button
              variant="outline"
              size="sm"
              className="hidden border-accent text-accent hover:bg-accent/10 sm:flex"
            >
              Post a Job
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
