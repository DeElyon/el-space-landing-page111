'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, Download, Send, Wallet, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useLoader } from '@/components/loader-provider'
import { toast } from 'sonner'

interface WalletData {
  balance: number
  pending_balance: number
  total_earned: number
  total_withdrawn: number
  currency: string
  available_for_withdrawal: number
}

interface Transaction {
  id: string
  type: 'earning' | 'withdrawal' | 'refund' | 'fee'
  amount: number
  description: string
  status: 'completed' | 'pending' | 'failed'
  date: string
}

export default function WalletPage() {
  const router = useRouter()
  const { show: showLoader, hide: hideLoader } = useLoader()
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawMethod, setWithdrawMethod] = useState('bank')
  const [fundAmount, setFundAmount] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      setLoading(true)
      showLoader(2)
      
      // Get user ID from localStorage or session
      const userId = localStorage.getItem('userId') || 'user-123'

      const response = await fetch(`/api/wallet?userId=${userId}`)
      const data = await response.json()

      if (data.success && data.wallet) {
        setWallet(data.wallet)
      }

      // Mock transactions - replace with real API call
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          type: 'earning',
          amount: 500,
          description: 'Project: Website Redesign',
          status: 'completed',
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '2',
          type: 'withdrawal',
          amount: 250,
          description: 'Withdrawal to Bank Account',
          status: 'completed',
          date: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: '3',
          type: 'earning',
          amount: 300,
          description: 'Project: Mobile App Development',
          status: 'completed',
          date: new Date(Date.now() - 259200000).toISOString(),
        },
      ]
      setTransactions(mockTransactions)
      hideLoader()
    } catch (error) {
      console.error('Error fetching wallet:', error)
      toast.error('Failed to load wallet data')
      hideLoader()
    } finally {
      setLoading(false)
    }
  }

  const handleWithdrawal = async () => {
    if (!withdrawAmount || !withdrawMethod) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      showLoader(3)
      const userId = localStorage.getItem('userId') || 'user-123'

      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'withdraw',
          userId,
          amount: parseFloat(withdrawAmount),
          method: withdrawMethod,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Withdrawal request submitted!')
        setWithdrawAmount('')
        setWithdrawMethod('bank')
        setDialogOpen(false)
        fetchWalletData()
      } else {
        toast.error(data.error || 'Withdrawal failed')
      }
      hideLoader()
    } catch (error) {
      console.error('Withdrawal error:', error)
      toast.error('Withdrawal error')
      hideLoader()
    }
  }

  const handleFunding = async () => {
    if (!fundAmount) {
      toast.error('Please enter amount')
      return
    }

    try {
      showLoader(2)
      const userId = localStorage.getItem('userId') || 'user-123'

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'fund-wallet',
          userId,
          amount: parseFloat(fundAmount),
          currency: 'USD',
          email: localStorage.getItem('email') || 'user@example.com',
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Redirecting to payment...')
        setTimeout(() => {
          if (data.authorization_url) {
            window.location.href = data.authorization_url
          }
        }, 1500)
      } else {
        toast.error(data.error || 'Funding failed')
        hideLoader()
      }
    } catch (error) {
      console.error('Funding error:', error)
      toast.error('Funding error')
      hideLoader()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Wallet className="w-12 h-12 mx-auto mb-4 animate-bounce" />
          <p>Loading wallet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <Wallet className="w-10 h-10 text-blue-400" />
            Your Wallet
          </h1>
          <p className="text-blue-200">Manage your earnings, funds, and withdrawals</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${(wallet?.available_for_withdrawal || 0).toFixed(2)}
              </div>
              <p className="text-xs text-blue-300 mt-1">Ready to withdraw</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">Pending Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">
                ${(wallet?.pending_balance || 0).toFixed(2)}
              </div>
              <p className="text-xs text-blue-300 mt-1">Awaiting release</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                ${(wallet?.total_earned || 0).toFixed(2)}
              </div>
              <p className="text-xs text-blue-300 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">Total Withdrawn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                ${(wallet?.total_withdrawn || 0).toFixed(2)}
              </div>
              <p className="text-xs text-blue-300 mt-1">Withdrawn to account</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                Fund Wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-blue-500/20">
              <DialogHeader>
                <DialogTitle className="text-white">Fund Your Wallet</DialogTitle>
                <DialogDescription className="text-blue-200">
                  Add funds to your wallet using a payment method
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fund-amount" className="text-white">Amount</Label>
                  <Input
                    id="fund-amount"
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="Enter amount in USD"
                    className="bg-slate-700 border-blue-500/20 text-white"
                  />
                </div>
                <Button
                  onClick={handleFunding}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue to Payment
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 gap-2"
                disabled={!wallet || wallet.available_for_withdrawal <= 0}
              >
                <ArrowUpRight className="w-4 h-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-blue-500/20">
              <DialogHeader>
                <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
                <DialogDescription className="text-blue-200">
                  Withdraw your available balance to your account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="withdraw-amount" className="text-white">Amount</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder={`Max: $${wallet?.available_for_withdrawal.toFixed(2)}`}
                    className="bg-slate-700 border-blue-500/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="withdraw-method" className="text-white">Method</Label>
                  <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                    <SelectTrigger className="bg-slate-700 border-blue-500/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-blue-500/20">
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleWithdrawal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Request Withdrawal
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Transactions Table */}
        <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Transaction History</CardTitle>
            <CardDescription className="text-blue-300">
              Your recent wallet transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-blue-500/10 hover:border-blue-500/30 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        {tx.type === 'earning' && (
                          <ArrowDownLeft className="w-5 h-5 text-green-400" />
                        )}
                        {tx.type === 'withdrawal' && (
                          <ArrowUpRight className="w-5 h-5 text-blue-400" />
                        )}
                        {tx.type === 'refund' && (
                          <Send className="w-5 h-5 text-orange-400" />
                        )}
                        {tx.type === 'fee' && (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{tx.description}</p>
                        <p className="text-sm text-blue-300">
                          {new Date(tx.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        tx.type === 'earning' ? 'text-green-400' :
                        tx.type === 'withdrawal' ? 'text-blue-400' : 'text-red-400'
                      }`}>
                        {tx.type === 'earning' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs mt-1 ${
                          tx.status === 'completed'
                            ? 'border-green-500/50 text-green-300'
                            : tx.status === 'pending'
                            ? 'border-yellow-500/50 text-yellow-300'
                            : 'border-red-500/50 text-red-300'
                        }`}
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-blue-300">
                  <Wallet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No transactions yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
