'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { LayoutDashboard, Users, DollarSign, FileText, Settings, LogOut, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPayments: 0,
    pendingPayments: 0,
    totalJobListings: 0,
    pendingApprovals: 0,
  })
  const [users, setUsers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const ADMIN_PASSWORD = 'Elspace12345@'

  useEffect(() => {
    // Check if already authenticated via localStorage
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken === 'true') {
      setIsAuthenticated(true)
      fetchAdminData()
    }
  }, [])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminToken', 'true')
      localStorage.setItem('adminLoginTime', new Date().getTime().toString())
      setIsAuthenticated(true)
      toast.success('Admin authenticated')
      fetchAdminData()
    } else {
      toast.error('Invalid password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminLoginTime')
    setIsAuthenticated(false)
    setPassword('')
    router.push('/')
  }

  const fetchAdminData = async () => {
    try {
      setLoading(true)

      // Fetch stats
      const statsResponse = await fetch('/api/admin/stats')
      const statsData = await statsResponse.json()
      if (statsData.success) {
        setStats(statsData.stats)
      }

      // Fetch users
      const usersResponse = await fetch('/api/admin/users')
      const usersData = await usersResponse.json()
      if (usersData.success) {
        setUsers(usersData.users || [])
      }

      // Fetch payments
      const paymentsResponse = await fetch('/api/admin/payments')
      const paymentsData = await paymentsResponse.json()
      if (paymentsData.success) {
        setPayments(paymentsData.payments || [])
      }

      // Fetch jobs
      const jobsResponse = await fetch('/api/admin/jobs')
      const jobsData = await jobsResponse.json()
      if (jobsData.success) {
        setJobs(jobsData.jobs || [])
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const approvePayment = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      })

      if (response.ok) {
        toast.success('Payment approved')
        fetchAdminData()
      }
    } catch (error) {
      toast.error('Failed to approve payment')
    }
  }

  const rejectPayment = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      })

      if (response.ok) {
        toast.success('Payment rejected')
        fetchAdminData()
      }
    } catch (error) {
      toast.error('Failed to reject payment')
    }
  }

  const approveJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      })

      if (response.ok) {
        toast.success('Job approved')
        fetchAdminData()
      }
    } catch (error) {
      toast.error('Failed to approve job')
    }
  }

  const rejectJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      })

      if (response.ok) {
        toast.success('Job rejected')
        fetchAdminData()
      }
    } catch (error) {
      toast.error('Failed to reject job')
    }
  }

  const suspendUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'suspended' }),
      })

      if (response.ok) {
        toast.success('User suspended')
        fetchAdminData()
      }
    } catch (error) {
      toast.error('Failed to suspend user')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Admin Access</CardTitle>
            <CardDescription className="text-blue-200">Enter admin password to proceed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-slate-700 border-blue-500/20 text-white"
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              Authenticate
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-10 h-10 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-blue-200 text-sm">System Management & Approvals</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-500/50 text-red-400 gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="py-6">
              <p className="text-slate-400 text-sm mb-2">Total Users</p>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="py-6">
              <p className="text-slate-400 text-sm mb-2">Total Payments</p>
              <p className="text-3xl font-bold text-green-400">${stats.totalPayments}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="py-6">
              <p className="text-slate-400 text-sm mb-2">Pending Payments</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.pendingPayments}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="py-6">
              <p className="text-slate-400 text-sm mb-2">Job Listings</p>
              <p className="text-3xl font-bold text-blue-400">{stats.totalJobListings}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-red-500/20">
            <CardContent className="py-6">
              <p className="text-slate-400 text-sm mb-2">Pending Approvals</p>
              <p className="text-3xl font-bold text-red-400">{stats.pendingApprovals}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Complete Database
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">System Overview</CardTitle>
                <CardDescription className="text-blue-200">Key metrics and pending actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Pending Payments to Review</span>
                      <Badge className="bg-yellow-600 text-yellow-200">{stats.pendingPayments}</Badge>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-orange-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Pending Job Approvals</span>
                      <Badge className="bg-orange-600 text-orange-200">{stats.pendingApprovals}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-blue-200">View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                          <div>
                            <p className="text-white font-medium">{user.full_name || user.email}</p>
                            <p className="text-slate-400 text-xs">{user.id}</p>
                          </div>
                          <div>
                            <p className="text-slate-300 text-sm">Role: {user.role || 'N/A'}</p>
                            <p className="text-slate-400 text-xs">{user.email}</p>
                          </div>
                          <div>
                            <p className="text-slate-300 text-sm">Balance: ${user.balance || 0}</p>
                            <p className="text-slate-400 text-xs">Verified: {user.is_verified ? 'Yes' : 'No'}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge className={user.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                            {user.status}
                          </Badge>
                          {user.status === 'active' && (
                            <AlertDialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="destructive">Suspend</Button>
                              </DialogTrigger>
                              <AlertDialogContent className="bg-slate-800 border-slate-700">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-white">Suspend User</AlertDialogTitle>
                                  <AlertDialogDescription className="text-slate-400">
                                    Are you sure you want to suspend this user? This action can be reversed.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => suspendUser(user.id)} className="bg-red-600 hover:bg-red-700">Suspend</AlertDialogAction>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center py-8">No users found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Payment Approvals</CardTitle>
                <CardDescription className="text-blue-200">Review and approve pending payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                        <div className="flex-1">
                          <p className="text-white font-medium">{payment.description || 'Payment'}</p>
                          <p className="text-gray-300 font-bold text-lg">${payment.amount}</p>
                          <p className="text-slate-400 text-sm mt-1">User: {payment.user_id}</p>
                          <p className="text-slate-500 text-xs">Date: {new Date(payment.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            payment.status === 'pending' ? 'bg-yellow-600' :
                            payment.status === 'approved' ? 'bg-green-600' :
                            'bg-red-600'
                          }>
                            {payment.status}
                          </Badge>
                          {payment.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => approvePayment(payment.id)} className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" onClick={() => rejectPayment(payment.id)} variant="destructive">
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center py-8">No payments to review</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Job Listing Approvals</CardTitle>
                <CardDescription className="text-blue-200">Review and approve job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                        <div className="flex-1">
                          <p className="text-white font-medium">{job.title}</p>
                          <p className="text-slate-400 text-sm">Budget: ${job.budget}</p>
                          <p className="text-slate-400 text-sm">{job.description?.substring(0, 100)}...</p>
                          <p className="text-slate-500 text-xs mt-1">Posted by: {job.client_id}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            job.status === 'pending' ? 'bg-yellow-600' :
                            job.status === 'approved' ? 'bg-green-600' :
                            'bg-red-600'
                          }>
                            {job.status}
                          </Badge>
                          {job.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => approveJob(job.id)} className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" onClick={() => rejectJob(job.id)} variant="destructive">
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center py-8">No jobs to review</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Full System Database</CardTitle>
                <CardDescription className="text-blue-200">Raw view and management of all system records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  {/* Summary Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                      <thead className="bg-slate-700/50 text-slate-200">
                        <tr>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Total Records</th>
                          <th className="px-4 py-3">Pending Action</th>
                          <th className="px-4 py-3">Last Activity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        <tr>
                          <td className="px-4 py-4">Users & Roles</td>
                          <td className="px-4 py-4">{stats.totalUsers}</td>
                          <td className="px-4 py-4">3 Verification Requests</td>
                          <td className="px-4 py-4">Today, 10:45 AM</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4">Payments & Escrow</td>
                          <td className="px-4 py-4">{payments.length}</td>
                          <td className="px-4 py-4">{stats.pendingPayments} Pending Approvals</td>
                          <td className="px-4 py-4">Today, 09:15 AM</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4">Jobs & Contracts</td>
                          <td className="px-4 py-4">{stats.totalJobListings}</td>
                          <td className="px-4 py-4">{stats.pendingApprovals} New Listings</td>
                          <td className="px-4 py-4">Yesterday, 04:30 PM</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4">Milestones & Payouts</td>
                          <td className="px-4 py-4">12 Active</td>
                          <td className="px-4 py-4">5 Ready for Payout</td>
                          <td className="px-4 py-4">Today, 11:20 AM</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4">Disputes & Support</td>
                          <td className="px-4 py-4">1 Open</td>
                          <td className="px-4 py-4">1 Awaiting Mediation</td>
                          <td className="px-4 py-4">2 days ago</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <Button variant="outline" className="border-blue-500/30 text-blue-300">
                      Export Full Database (JSON)
                    </Button>
                    <Button variant="outline" className="border-blue-500/30 text-blue-300">
                      System Backup
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Refresh All Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
