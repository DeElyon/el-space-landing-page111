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
        return <Mail className="w-6 h-6 text-cyan-500" />
      case 'login':
        return <Zap className="w-6 h-6 text-green-500" />
      case 'transfer':
      case 'withdrawal':
        return <AlertCircle className="w-6 h-6 text-amber-500" />
      default:
        return <Mail className="w-6 h-6 text-cyan-500" />
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
      <AlertDialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold flex items-center gap-3">
            {getIcon()}
            {getTitle()}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            We&apos;ve sent a verification code to <strong className="text-white">{email}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-6">
          {/* OTP Display - Large and Easily selectable */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-8 text-center border-2 border-cyan-500/50">
            <p className="text-xs text-slate-300 mb-3 uppercase tracking-widest font-semibold">Your Verification Code</p>
            <div className="text-6xl font-bold tracking-wider text-cyan-300 font-mono select-all mb-3 p-4 bg-slate-900/50 rounded-lg">
              {otp.split('').join(' ')}
            </div>
            <p className="text-2xl font-mono text-cyan-400 font-bold">
              {otp}
            </p>
          </div>

          {/* OTP Input Field - For manual entry or paste */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block font-semibold">
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
              className={`bg-slate-700/50 border text-white placeholder-slate-500 text-center text-3xl tracking-widest font-mono font-bold transition-all ${
                enteredOTP.length === 6 && enteredOTP === otp
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-slate-600 hover:border-cyan-500/50 focus:border-cyan-500'
              }`}
            />
            {enteredOTP.length === 6 && enteredOTP === otp && (
              <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                OTP verified! Auto-closing...
              </p>
            )}
            {enteredOTP.length === 6 && enteredOTP !== otp && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Invalid OTP. Please try again.
              </p>
            )}
          </div>

          {/* Timer and Info */}
          <div className="space-y-3">
            {/* Time remaining */}
            <div className={`bg-slate-700/50 rounded-lg p-4 text-center border ${timeLeft < 60 ? 'border-red-500/50' : 'border-cyan-500/30'}`}>
              <p className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-cyan-400'}`}>
                Expires in: {formatTime()}
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-2 bg-slate-700/20 rounded-lg p-4 border border-slate-600/50">
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                Check your email for additional instructions
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>
                {timeLeft < 60 ? 'Hurry! Code expires soon' : `Valid for ${expiryMinutes} minutes`}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full"></span>
                Never share your code with anyone
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Auto-verifies when pasted correctly
              </p>
            </div>
          </div>

          {/* Copy Button */}
          {showCopyButton && (
            <Button
              onClick={handleCopyOTP}
              variant="outline"
              className={`w-full ${copied 
                ? 'border-green-500/50 text-green-400 bg-green-500/10' 
                : 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500'
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
