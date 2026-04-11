'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { GlobalLoader } from './global-loader'

interface LoaderContextType {
  show: (duration?: number) => void
  hide: () => void
  isLoading: boolean
}

const LoaderContext = createContext<LoaderContextType | null>(null)

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [duration, setDuration] = useState(3)

  const show = useCallback((customDuration = 3) => {
    setDuration(Math.max(2, Math.min(5, customDuration)))
    setIsLoading(true)
  }, [])

  const hide = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <LoaderContext.Provider value={{ show, hide, isLoading }}>
      {children}
      <GlobalLoader isVisible={isLoading} duration={duration} />
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader must be used within LoaderProvider')
  }
  return context
}
