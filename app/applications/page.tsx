'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/auth-guard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, DollarSign, Globe, Trash2, MessageCircle } from 'lucide-react'

interface Application {
  id: string
  jobTitle: string
  company: string
  budget: number
  status: 'pending' | 'rejected' | 'accepted' | 'completed'
  appliedDate: string
  deadline: string
  skills: string[]
}

export default function ApplicationsPage() {
  const [userType] = useState<'freelancer' | 'client'>('freelancer')

  const mockApplications: Application[] = [
    {
      id: '1',
      jobTitle: 'E-Commerce Platform Development',
      company: 'Tech Startup Inc',
      budget: 5000,
      status: 'pending',
      appliedDate: '2 days ago',
      deadline: '5 days left',
      skills: ['React', 'Node.js'],
    },
    {
      id: '2',
      jobTitle: 'Mobile App UI/UX Design',
      company: 'Creative Agency',
      budget: 2000,
      status: 'accepted',
      appliedDate: '1 week ago',
      deadline: 'In progress',
      skills: ['Figma', 'Prototyping'],
    },
    {
      id: '3',
      jobTitle: 'Website Redesign',
      company: 'Digital Marketing',
      budget: 1500,
      status: 'rejected',
      appliedDate: '3 days ago',
      deadline: 'Closed',
      skills: ['Web Design'],
    },
  ]

  const statusConfig = {
    pending: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', label: 'Pending' },
    accepted: { color: 'bg-green-500/20 text-green-400 border-green-500/50', label: 'Accepted' },
    rejected: { color: 'bg-red-500/20 text-red-400 border-red-500/50', label: 'Rejected' },
    completed: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/50', label: 'Completed' },
  }

  const navItems = [
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'My Applications', href: '/applications' },
    { label: 'Messages', href: '/messages' },
  ]

  return (
    <DashboardLayout userType={userType} navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
          <p className="text-slate-400">Track your job proposals and applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Total Applications</p>
            <p className="text-3xl font-bold text-white">
              {mockApplications.length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-400">
              {mockApplications.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Accepted</p>
            <p className="text-3xl font-bold text-green-400">
              {mockApplications.filter(a => a.status === 'accepted').length}
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-blue-400">
              {mockApplications.filter(a => a.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-800 border-b border-slate-700">
            <TabsTrigger value="all" className="text-slate-400 data-[state=active]:text-white">
              All Applications ({mockApplications.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-slate-400 data-[state=active]:text-white">
              Pending ({mockApplications.filter(a => a.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="text-slate-400 data-[state=active]:text-white">
              Accepted ({mockApplications.filter(a => a.status === 'accepted').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockApplications.map((app) => (
              <div
                key={app.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{app.jobTitle}</h3>
                    <p className="text-slate-400 text-sm">{app.company}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`border ${statusConfig[app.status].color}`}
                  >
                    {statusConfig[app.status].label}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {app.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-slate-700 text-slate-300 border-0">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-slate-700 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Budget</p>
                    <p className="font-semibold text-amber-400 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {app.budget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Applied</p>
                    <p className="font-semibold text-white flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {app.appliedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Deadline</p>
                    <p className="font-semibold text-white">{app.deadline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Link</p>
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      View Job
                    </a>
                  </div>
                </div>

                <div className="flex gap-2">
                  {app.status === 'pending' && (
                    <>
                      <Button
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Client
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-600 text-slate-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Withdraw
                      </Button>
                    </>
                  )}
                  {app.status === 'accepted' && (
                    <>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Start Work
                      </Button>
                      <Button
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Client
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {mockApplications
              .filter(a => a.status === 'pending')
              .map((app) => (
                <div key={app.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white">{app.jobTitle}</h3>
                  <p className="text-slate-400">{app.company}</p>
                  <p className="text-amber-400 font-medium mt-2">Status: Awaiting client review</p>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {mockApplications
              .filter(a => a.status === 'accepted')
              .map((app) => (
                <div key={app.id} className="bg-slate-800 border border-green-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white">{app.jobTitle}</h3>
                  <p className="text-slate-400">{app.company}</p>
                  <p className="text-green-400 font-medium mt-2">✓ Congratulations! You got hired!</p>
                  <Button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white w-full">
                    Start Working on Project
                  </Button>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
