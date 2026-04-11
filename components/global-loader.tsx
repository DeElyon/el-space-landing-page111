'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GlobalLoaderProps {
  isVisible: boolean
  duration?: number // in seconds (2-5)
}

export const GlobalLoader: React.FC<GlobalLoaderProps> = ({ 
  isVisible, 
  duration = 3 
}) => {
  const [show, setShow] = useState(isVisible)

  useEffect(() => {
    setShow(isVisible)
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false)
      }, duration * 1000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center"
    >
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {/* EL SPACE Logo Loader */}
        <div className="relative w-32 h-32 mb-6">
          {/* Spinning outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Pulsing middle ring */}
          <motion.div
            className="absolute inset-3 rounded-full border-2 border-blue-500/40"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                EL
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent leading-none">
                SPACE
              </div>
            </motion.div>
          </div>

          {/* Rotating bottom dots */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400" />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white font-semibold tracking-widest"
        >
          Loading...
        </motion.div>

        {/* Progress bar */}
        <motion.div className="mt-6 w-48 h-1 bg-blue-900/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: duration, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Hook for managing loader state
export const useGlobalLoader = (initialDuration = 3) => {
  const [isLoading, setIsLoading] = useState(false)
  const [duration, setDuration] = useState(
    Math.max(2, Math.min(5, initialDuration))
  )

  const show = (customDuration?: number) => {
    if (customDuration) {
      setDuration(Math.max(2, Math.min(5, customDuration)))
    }
    setIsLoading(true)
  }

  const hide = () => {
    setIsLoading(false)
  }

  return { isLoading, show, hide, duration }
}
