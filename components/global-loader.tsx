'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ELLoader } from './ui/el-loader'

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
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-900/30 to-slate-950 backdrop-blur-md z-[9999] flex items-center justify-center"
    >
      <motion.div
        className="flex flex-col items-center justify-center w-full h-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {/* New EL Animated Loader */}
        <ELLoader />

        {/* Progress bar */}
        <motion.div className="mt-8 w-48 h-1 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"
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
