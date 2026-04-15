'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import { Suspense } from 'react'

function GitHubSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const token = searchParams.get('token')
      const userStr = searchParams.get('user')

      if (!token) {
        setError('No authentication token received')
        setTimeout(() => router.push('/auth/login?error=no_token'), 2000)
        return
      }

      // Save token and user info
      localStorage.setItem('authToken', token)
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          localStorage.setItem('user', JSON.stringify(user))
        } catch (e) {
          console.error('Failed to parse user info:', e)
        }
      }

      // Redirect to appropriate dashboard
      const user = userStr ? JSON.parse(userStr) : null
      if (user?.user_type === 'freelancer') {
        router.push('/freelancer')
      } else {
        router.push('/client')
      }
    } catch (err) {
      console.error('GitHub success error:', err)
      setError('An error occurred during authentication')
      setTimeout(() => router.push('/auth/login'), 2000)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Signing you in...</h1>
        <p className="text-gray-600">Please wait while we set up your account.</p>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  )
}

export default function GitHubSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
        </div>
      </div>
    }>
      <GitHubSuccessContent />
    </Suspense>
  )
}
