'use client'

import React, { Suspense } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Navbar } from '@/components/sections/Navbar'
import AuthenticatedNavbar from '@/components/authenticated-navbar'

export function NavbarWrapper() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Navbar /> // Show public navbar while checking auth
  }

  return isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />
}

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Navbar />}>
      <>
        <NavbarWrapper />
        {children}
      </>
    </Suspense>
  )
}
