'use client'

import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, AlertCircle, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface OTPNotificationProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  otp: string
  email: string
  type: 'register' | 'login' | 'transfer' | 'withdrawal' | 'email-verify'
  onVerified?: () => void
  showCopyButton?: boolean
  autoClose?: boolean
  expiryMinutes?: number
}

export function OTPNotification({
  isOpen,
  onOpenChange,
  otp,
  email,
  type,
  onVerified,
  showCopyButton = true,
  autoClose = true,
  expiryMinutes = 15,
}: OTPNotificationProps) {
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
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'transfer':
      case 'withdrawal':
        return <AlertCircle className="w-6 h-6 text-amber-500" />
      default:
        return <Mail className="w-6 h-6 text-cyan-500" />
    }
  }

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(otp)
    toast.success('OTP copied to clipboard!')
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
            We've sent a verification code to <strong className="text-white">{email}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-6">
          {/* OTP Display */}
          <div className="bg-gradient-to-r from-slate-700/50 to-slate-700/30 rounded-lg p-6 text-center border border-slate-600">
            <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider">Your Code</p>
            <div className="text-5xl font-bold tracking-widest text-cyan-400 font-mono select-all">
              {otp.split('').join(' ')}
            </div>
          </div>

          {/* Info Messages */}
          <div className="space-y-2 bg-slate-700/20 rounded-lg p-4 border border-slate-600/50">
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Check your email for the code
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>
              This code expires in {expiryMinutes} minutes
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full"></span>
              Do not share this code with anyone
            </p>
          </div>

          {/* Copy Button */}
          {showCopyButton && (
            <Button
              onClick={handleCopyOTP}
              variant="outline"
              className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          {onVerified && (
            <Button
              onClick={() => {
                onVerified()
                onOpenChange(false)
              }}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              Got it
            </Button>
          )}
          {!onVerified && (
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              Close
            </Button>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
