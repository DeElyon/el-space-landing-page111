'use client'

import { useState } from 'react'
import { Navbar } from '@/components/sections/Navbar'
import { FeaturedTalent } from '@/components/sections/FeaturedTalent'
import { Footer } from '@/components/sections/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, Star, MapPin, Briefcase, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function FreelancersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  // Sample freelancer data
  const freelancers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Full Stack Developer',
      hourlyRate: '$85/hr',
      rating: 4.9,
      reviews: 127,
      skills: ['React', 'Node.js', 'PostgreSQL'],
      badges: ['Top Performer', 'Verified Expert'],
      completedProjects: 245,
      responseTime: '2 hours'
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      title: 'UI/UX Designer',
      hourlyRate: '$65/hr',
      rating: 4.8,
      reviews: 89,
      skills: ['Figma', 'Web Design', 'Prototyping'],
      badges: ['Top Performer', 'Client Favorite'],
      completedProjects: 167,
      responseTime: '1 hour'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      title: 'Python Developer',
      hourlyRate: '$75/hr',
      rating: 4.9,
      reviews: 156,
      skills: ['Python', 'Django', 'Data Science'],
      badges: ['Top Performer', 'Verified Expert'],
      completedProjects: 198,
      responseTime: '3 hours'
    },
    {
      id: 4,
      name: 'James Wilson',
      title: 'Mobile Developer',
      hourlyRate: '$80/hr',
      rating: 4.7,
      reviews: 94,
      skills: ['React Native', 'Swift', 'Firebase'],
      badges: ['Top Performer', 'Quick Responder'],
      completedProjects: 134,
      responseTime: '30 minutes'
    },
    {
      id: 5,
      name: 'Lisa Chen',
      title: 'Cloud Architect',
      hourlyRate: '$95/hr',
      rating: 4.9,
      reviews: 78,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      badges: ['Top Performer', 'Verified Expert'],
      completedProjects: 112,
      responseTime: '1 hour'
    },
    {
      id: 6,
      name: 'David Kumar',
      title: 'Blockchain Developer',
      hourlyRate: '$100/hr',
      rating: 4.8,
      reviews: 65,
      skills: ['Solidity', 'Web3', 'Smart Contracts'],
      badges: ['Verified Expert', 'In Demand'],
      completedProjects: 89,
      responseTime: '2 hours'
    }
  ]

  const allSkills = ['React', 'Node.js', 'Python', 'UI Design', 'AWS', 'Solidity']

  const filteredFreelancers = freelancers
    .filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(f => !selectedSkill || f.skills.includes(selectedSkill))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price') return parseInt(a.hourlyRate) - parseInt(b.hourlyRate)
      if (sortBy === 'reviews') return b.reviews - a.reviews
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Browse Talented Freelancers
          </h1>
          <p className="text-slate-400 text-lg">
            Find the perfect professional for your project. All freelancers are verified and vetted.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by name, title, or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Skill Filter */}
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-white rounded-lg hover:border-slate-500 transition-colors"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-white rounded-lg hover:border-slate-500 transition-colors"
            >
              <option value="rating">Top Rated</option>
              <option value="price">Price: Low to High</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-400">
            Found <strong className="text-white">{filteredFreelancers.length}</strong> freelancers
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Freelancers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFreelancers.length > 0 ? (
            filteredFreelancers.map((freelancer) => (
              <Link key={freelancer.id} href={`/freelancer/${freelancer.id}`}>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer h-full">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{freelancer.name}</h3>
                        <p className="text-slate-400 text-sm">{freelancer.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-bold">{freelancer.hourlyRate}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-white">{freelancer.rating}</span>
                      </div>
                      <span className="text-slate-400 text-sm">({freelancer.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-slate-700/20 rounded-lg">
                    <div>
                      <p className="text-slate-400 text-xs">Projects Completed</p>
                      <p className="text-white font-bold">{freelancer.completedProjects}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Response Time</p>
                      <p className="text-white font-bold">{freelancer.responseTime}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-slate-400 text-xs mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {freelancer.skills.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700/50 border border-slate-600 text-slate-400 text-xs rounded">
                          +{freelancer.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {freelancer.badges.map(badge => (
                      <span key={badge} className="px-2 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-xs rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold">
                    View Profile
                  </Button>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 text-lg">No freelancers found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedSkill('')
                }}
                className="mt-4 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Featured Talent Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Talent</h2>
          <FeaturedTalent />
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Web Development', 'Mobile Development', 'UI/UX Design', 'Cloud Architecture', 'Data Science', 'Blockchain', 'DevOps', 'AI/ML'].map(category => (
              <button
                key={category}
                className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-colors text-white hover:bg-slate-800/70"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-12 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-slate-400 mb-8">
            Post your project and let freelancers apply. You'll find the perfect match in no time.
          </p>
          <Link
            href="/jobs/post"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Post a Project
          </Link>
        </section>

        {/* Back Link */}
        <div className="pt-8 border-t border-slate-700">
          <Link
            href="/"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
