'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { LayoutDashboard, Users, DollarSign, FileText, Settings, LogOut, CheckCircle, XCircle, BarChart3, TrendingUp, Activity, Bell, Eye } from 'lucide-react'
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
  const [users, setUsers] = useState<Record<string, unknown>[]>([])
  const [payments, setPayments] = useState<Record<string, unknown>[]>([])
  const [jobs, setJobs] = useState<Record<string, unknown>[]>([])
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <Card className="w-full max-w-md bg-slate-900/80 backdrop-blur border-purple-500/30 shadow-2xl relative z-10">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">Admin Portal</CardTitle>
                <CardDescription className="text-purple-200">System Management Access</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Security Password</label>
              <Input
                type="password"
                placeholder="••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-slate-800/50 border-purple-500/30 text-white placeholder-slate-500 focus:border-purple-400 focus:ring-purple-500/20"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Enter Dashboard
            </Button>
            <div className="text-xs text-slate-400 text-center">
              🔒 Your connection is encrypted and monitored
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EL SPACE Control Center</h1>
              <p className="text-xs text-slate-400">Real-time Platform Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:text-red-300">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Users Card */}
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-500/30 hover:border-blue-400/50 transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-2">Total Users</p>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-xs text-blue-300 mt-1">↑ 12% this month</p>
                </div>
                <Users className="w-12 h-12 text-blue-400/30" />
              </div>
            </CardContent>
          </Card>

          {/* Payments Card */}
          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-500/30 hover:border-green-400/50 transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium mb-2">Total Volume</p>
                  <p className="text-3xl font-bold text-white">${stats.totalPayments}</p>
                  <p className="text-xs text-green-300 mt-1">↑ 8% vs last week</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-400/30" />
              </div>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-500/30 hover:border-yellow-400/50 transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 text-sm font-medium mb-2">Pending Review</p>
                  <p className="text-3xl font-bold text-white">{stats.pendingPayments}</p>
                  <p className="text-xs text-yellow-300 mt-1">Action required</p>
                </div>
                <Activity className="w-12 h-12 text-yellow-400/30" />
              </div>
            </CardContent>
          </Card>

          {/* Jobs Card */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/30 hover:border-purple-400/50 transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium mb-2">Job Listings</p>
                  <p className="text-3xl font-bold text-white">{stats.totalJobListings}</p>
                  <p className="text-xs text-purple-300 mt-1">↑ 5 new today</p>
                </div>
                <FileText className="w-12 h-12 text-purple-400/30" />
              </div>
            </CardContent>
          </Card>

          {/* Approvals Card */}
          <Card className="bg-gradient-to-br from-red-900/30 to-red-800/30 border-red-500/30 hover:border-red-400/50 transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm font-medium mb-2">Pending Approvals</p>
                  <p className="text-3xl font-bold text-white">{stats.pendingApprovals}</p>
                  <p className="text-xs text-red-300 mt-1">⚠ Requires attention</p>
                </div>
                <BarChart3 className="w-12 h-12 text-red-400/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-1 space-x-1 w-full grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="payments" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600">
              <DollarSign className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
              <FileText className="w-4 h-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="monitor" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600">
              <Eye className="w-4 h-4 mr-2" />
              Monitor
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
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">Suspend</Button>
                              </AlertDialogTrigger>
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

          {/* Monitoring Tab */}
          <TabsContent value="monitor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* System Health Card */}
              <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-100 text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-200">Database</span>
                      <span className="text-green-400 font-bold">99.9%</span>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: "99.9%"}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-200">API Services</span>
                      <span className="text-green-400 font-bold">100%</span>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: "100%"}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-200">Payment Gateway</span>
                      <span className="text-green-400 font-bold">98.5%</span>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: "98.5%"}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Card */}
              <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-500/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-blue-100 text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 bg-blue-500/5 rounded">
                      <span className="text-blue-200">New user registration</span>
                      <span className="text-blue-400 text-xs">5m ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-500/5 rounded">
                      <span className="text-blue-200">Payment processed</span>
                      <span className="text-green-400 text-xs">12m ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-500/5 rounded">
                      <span className="text-blue-200">Job listing approved</span>
                      <span className="text-purple-400 text-xs">23m ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-500/5 rounded">
                      <span className="text-blue-200">Milestone completed</span>
                      <span className="text-yellow-400 text-xs">1h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Platform Metrics</CardTitle>
                <CardDescription className="text-slate-400">Real-time performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <p className="text-slate-400 text-sm mb-2">Avg Response Time</p>
                    <p className="text-2xl font-bold text-cyan-400">245ms</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <p className="text-slate-400 text-sm mb-2">Requests/Second</p>
                    <p className="text-2xl font-bold text-green-400">1,234</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <p className="text-slate-400 text-sm mb-2">Error Rate</p>
                    <p className="text-2xl font-bold text-yellow-400">0.02%</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <p className="text-slate-400 text-sm mb-2">Cache Hit Rate</p>
                    <p className="text-2xl font-bold text-purple-400">94.5%</p>
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
