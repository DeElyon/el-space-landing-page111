'use client'

import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle, AlertCircle, Copy, ClipboardPaste, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

interface OTPNotificationProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  otp: string
  email: string
  type: 'register' | 'login' | 'transfer' | 'withdrawal' | 'email-verify'
  onVerified?: () => void
  onOTPCopied?: (otp: string) => void
  showCopyButton?: boolean
  autoClose?: boolean
  expiryMinutes?: number
  onOTPEntered?: (otp: string) => void
}

export function OTPNotification({
  isOpen,
  onOpenChange,
  otp,
  email,
  type,
  onVerified,
  onOTPCopied,
  showCopyButton = true,
  autoClose = true,
  expiryMinutes = 15,
  onOTPEntered,
}: OTPNotificationProps) {
  const [copied, setCopied] = useState(false)
  const [enteredOTP, setEnteredOTP] = useState('')
  const [timeLeft, setTimeLeft] = useState(expiryMinutes * 60)

  useEffect(() => {
    if (!isOpen) {
      setEnteredOTP('')
      return
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  // Auto-verify when OTP is entered
  useEffect(() => {
    if (enteredOTP.length === 6 && enteredOTP === otp) {
      setEnteredOTP('')
      onOTPEntered?.(enteredOTP)
      onVerified?.()
      toast.success('OTP verified successfully!')
      setTimeout(() => {
        onOpenChange(false)
      }, 1000)
    }
  }, [enteredOTP, otp, onVerified, onOTPEntered, onOpenChange])

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTitle = () => {
    switch (type) {
      case 'register':
        return 'Verify Your Email'
      case 'login':
        return 'Enter Verification Code'
      case 'transfer':
        return 'Confirm Transfer'
      case 'withdrawal':
        return 'Confirm Withdrawal'
      case 'email-verify':
        return 'Email Verification'
      default:
        return 'Verification Code'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'register':
      case 'email-verify':
        return <Mail className="w-6 h-6 text-red-600" />
      case 'login':
        return <Zap className="w-6 h-6 text-gold" />
      case 'transfer':
      case 'withdrawal':
        return <AlertCircle className="w-6 h-6 text-red-600" />
      default:
        return <Mail className="w-6 h-6 text-red-600" />
    }
  }

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(otp)
    setCopied(true)
    onOTPCopied?.(otp)
    toast.success('OTP copied! Now paste it in the input field below.')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOTPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setEnteredOTP(value)
  }

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const input = e.currentTarget
    
    setTimeout(() => {
      setEnteredOTP(pastedText)
      input.value = pastedText
    }, 0)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gradient-to-br from-white to-red-50 border-red-300 text-gray-900 shadow-xl shadow-red-500/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
            {getIcon()}
            {getTitle()}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-base">
            We&apos;ve sent a verification code to <strong className="text-gray-900">{email}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-6">
          {/* OTP Display - Large and Easily selectable */}
          <div className="bg-gradient-to-r from-red-500/20 to-gold/20 rounded-lg p-8 text-center border-2 border-red-500/50">
            <p className="text-xs text-gray-600 mb-3 uppercase tracking-widest font-semibold">Your Verification Code</p>
            <div className="text-6xl font-bold tracking-wider text-red-600 font-mono select-all mb-3 p-4 bg-white/50 rounded-lg">
              {otp.split('').join(' ')}
            </div>
            <p className="text-2xl font-mono text-red-600 font-bold">
              {otp}
            </p>
          </div>

          {/* OTP Input Field - For manual entry or paste */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-semibold">
              Enter or Paste Code
            </label>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="000000"
              value={enteredOTP}
              onChange={handleOTPInput}
              onPaste={handlePaste}
              maxLength={6}
              className={`bg-white border text-gray-900 placeholder-gray-400 text-center text-3xl tracking-widest font-mono font-bold transition-all ${
                enteredOTP.length === 6 && enteredOTP === otp
                  ? 'border-green-500/50 bg-green-50'
                  : 'border-red-300 hover:border-red-500/50 focus:border-red-600'
              }`}
            />
            {enteredOTP.length === 6 && enteredOTP === otp && (
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1 font-semibold">
                <CheckCircle className="w-4 h-4" />
                OTP verified! Auto-closing...
              </p>
            )}
            {enteredOTP.length === 6 && enteredOTP !== otp && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-4 h-4" />
                Invalid OTP. Please try again.
              </p>
            )}
          </div>

          {/* Timer and Info */}
          <div className="space-y-3">
            {/* Time remaining */}
            <div className={`bg-red-50 rounded-lg p-4 text-center border ${
              timeLeft < 60 ? 'border-red-500/50' : 'border-red-300'
            }`}>
              <p className={`text-lg font-bold ${
                timeLeft < 60 ? 'text-red-600' : 'text-gold'
              }`}>
                Expires in: {formatTime()}
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-2 bg-red-50 rounded-lg p-4 border border-red-300">
              <p className="text-sm text-gray-700 flex items-center gap-2 font-semibold">
                <Mail className="w-4 h-4 text-red-600" />
                Check your email for additional instructions
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                {timeLeft < 60 ? 'Hurry! Code expires soon' : `Valid for ${expiryMinutes} minutes`}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-gold rounded-full"></span>
                Never share your code with anyone
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                Auto-verifies when pasted correctly
              </p>
            </div>
          </div>

          {/* Copy Button */}
          {showCopyButton && (
            <Button
              onClick={handleCopyOTP}
              variant="outline"
              className={`w-full font-semibold ${
                copied
                  ? 'border-green-500/50 text-green-700 bg-green-50'
                  : 'border-red-300 text-red-600 hover:bg-red-50 hover:border-red-500'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Code Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code to Clipboard
                </>
              )}
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => {
              onVerified?.()
              onOpenChange(false)
            }}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            {onVerified ? 'Code Received' : 'Close'}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
