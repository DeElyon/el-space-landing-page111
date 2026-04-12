'use client'

import { NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with text */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="relative h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0">
              <div className="h-full w-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-cyan-500/30">
                EL
              </div>
            </div>
            <span className="hidden text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent sm:inline-block">
              EL SPACE
            </span>
          </Link>

          {/* Nav Links - Hidden on mobile */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-200 hover:underline underline-offset-4 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons & Links */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="sm"
                className="border border-purple-500/50 bg-purple-500/5 text-purple-300 hover:bg-purple-500/15 hover:border-purple-500/80 font-medium transition-all"
              >
                Post a Job
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-95"
              >
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and Apply Now button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/auth/register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium transition-all"
              >
                Apply Now
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mt-4 space-y-4 border-t border-slate-700 pt-4 md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2 border-t border-slate-700 pt-4">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-slate-300 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  className="w-full border border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  Post a Job
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="border-t border-slate-700 pt-4">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-slate-400 hover:text-white">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
