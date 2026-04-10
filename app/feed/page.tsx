'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/auth-guard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Search, Star, MapPin, Briefcase, Users, Filter, Heart, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Freelancer {
  id: string
  name: string
  title: string
  rate: number
  rating: number
  reviews: number
  skills: string[]
  bio: string
  image?: string
  location?: string
  availability: string
}

interface Project {
  id: string
  title: string
  description: string
  budget: number
  timeline: string
  skills: string[]
  postedBy: string
  image?: string
  proposals: number
}

export default function FeedPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('discover')
  const [searchQuery, setSearchQuery] = useState('')
  const [userType] = useState<'client' | 'freelancer'>('client')
  const [favorites, setFavorites] = useState<string[]>([])

  // Mock data
  const mockFreelancers: Freelancer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Full Stack Developer',
      rate: 85,
      rating: 4.9,
      reviews: 127,
      skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      bio: 'Experienced full-stack developer specializing in modern web applications',
      location: 'San Francisco, CA',
      availability: 'Available now',
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      title: 'UI/UX Designer',
      rate: 65,
      rating: 4.8,
      reviews: 89,
      skills: ['Figma', 'Web Design', 'Prototyping', 'User Research'],
      bio: 'Creative designer focused on user-centered design solutions',
      location: 'Remote',
      availability: 'Available in 2 days',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      title: 'Python Developer',
      rate: 75,
      rating: 4.9,
      reviews: 156,
      skills: ['Python', 'Django', 'Data Science', 'AWS'],
      bio: 'Data-driven developer experienced in building scalable systems',
      location: 'Madrid, Spain',
      availability: 'Available now',
    },
  ]

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform Development',
      description: 'Build a modern e-commerce platform with payment integration',
      budget: 5000,
      timeline: '3 months',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      postedBy: 'Tech Startup Inc',
      proposals: 12,
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design',
      description: 'Design a beautiful and intuitive mobile app interface',
      budget: 2000,
      timeline: '2 weeks',
      skills: ['Figma', 'User Research', 'Prototyping'],
      postedBy: 'Creative Agency',
      proposals: 8,
    },
  ]

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const navItems = [
    { label: 'Feed', href: '/feed' },
    { label: 'My Applications', href: '/applications' },
    { label: 'Messages', href: '/messages' },
  ]

  return (
    <DashboardLayout userType={userType} navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {userType === 'client' ? 'Browse Talent' : 'Discover Opportunities'}
          </h1>
          <p className="text-slate-400">
            {userType === 'client' 
              ? 'Find the perfect freelancer for your project'
              : 'Find projects that match your skills'}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder={userType === 'client' ? 'Search freelancers...' : 'Search projects...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
            />
          </div>
          <Button variant="outline" size="icon" className="border-slate-700 text-slate-400">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800 border-b border-slate-700">
            {userType === 'client' ? (
              <>
                <TabsTrigger value="discover" className="text-slate-400 data-[state=active]:text-white">
                  All Freelancers
                </TabsTrigger>
                <TabsTrigger value="recommended" className="text-slate-400 data-[state=active]:text-white">
                  Recommended for You
                </TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="discover" className="text-slate-400 data-[state=active]:text-white">
                  All Projects
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="text-slate-400 data-[state=active]:text-white">
                  For You
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {userType === 'client' ? (
            <>
              <TabsContent value="discover" className="space-y-4">
                {mockFreelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{freelancer.name}</h3>
                          <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-0">
                            ⭐ {freelancer.rating} ({freelancer.reviews})
                          </Badge>
                        </div>
                        <p className="text-amber-400 font-semibold mb-2">${freelancer.rate}/hr</p>
                        <p className="text-slate-400 mb-3 text-sm">{freelancer.title}</p>
                        <p className="text-slate-300 mb-3">{freelancer.bio}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {freelancer.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="border-slate-600 text-slate-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          {freelancer.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {freelancer.location}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {freelancer.availability}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          className="bg-cyan-500 hover:bg-cyan-600 text-white"
                          onClick={() => router.push(`/freelancer/${freelancer.id}`)}
                        >
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(freelancer.id)}
                          className={favorites.includes(freelancer.id) ? 'text-red-400' : 'text-slate-400'}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(freelancer.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="recommended" className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 text-center">
                  <p className="text-slate-400 mb-4">Personalized recommendations coming soon</p>
                  <Button variant="outline" className="border-slate-600">
                    View All Freelancers
                  </Button>
                </div>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="discover" className="space-y-4">
                {mockProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-slate-300 mb-4 text-sm">{project.description}</p>
                        <div className="flex items-center gap-6 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-amber-400">
                            <Briefcase className="w-4 h-4" />
                            ${project.budget}
                          </div>
                          <div className="text-slate-400">
                            Timeline: {project.timeline}
                          </div>
                          <div className="text-slate-400">
                            <Users className="w-4 h-4 inline mr-1" />
                            {project.proposals} proposals
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="border-slate-600 text-slate-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500">Posted by {project.postedBy}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          className="bg-cyan-500 hover:bg-cyan-600 text-white"
                          onClick={() => router.push(`/jobs/${project.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          Send Proposal
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="recommendations" className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 text-center">
                  <p className="text-slate-400 mb-4">Personalized project recommendations coming soon</p>
                  <Button variant="outline" className="border-slate-600">
                    View All Projects
                  </Button>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
