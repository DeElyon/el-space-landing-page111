'use client'

import { useState, useEffect } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FeaturedTalent() {
  interface Freelancer {
    id: string;
    name: string;
    title: string;
    hourlyRate: string;
    rating: number;
    reviews: number;
    skills: string[];
    availability: string;
  }
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await fetch('/api/freelancers?limit=4')
        const data = await response.json()
        if (data.success) {
          setFreelancers(data.freelancers)
        }
      } catch (error) {
        console.error('Error fetching featured talent:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFreelancers()
  }, [])

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subheading="Meet Our Vetted Freelancers"
          heading="Top 5% of Tech Talent. Ready This Week."
          description="Handpicked professionals ready to bring your vision to life."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-800/50 rounded-lg animate-pulse"></div>
            ))
          ) : freelancers.length > 0 ? (
            freelancers.map((freelancer) => (
              <div
                key={freelancer.id}
                className="rounded-lg border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-6 transition-all hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] flex flex-col h-full"
              >
                {/* Avatar Placeholder */}
                <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl font-bold text-white">
                  {freelancer.name.charAt(0)}
                </div>

                {/* Name & Title */}
                <h3 className="mb-1 font-bold text-white">{freelancer.name}</h3>
                <p className="mb-3 text-sm text-slate-400">{freelancer.title}</p>

                {/* Skills */}
                <div className="mb-4 flex flex-wrap gap-2 flex-grow">
                  {freelancer.skills.slice(0, 3).map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Rate & Availability */}
                <div className="mb-4 border-t border-slate-700/50 pt-4 mt-auto">
                  <p className="mb-2 text-sm font-semibold text-emerald-400">
                    {freelancer.hourlyRate}
                  </p>
                  <p className="text-xs text-slate-400">
                    {freelancer.availability}
                  </p>
                </div>

                {/* CTA */}
                <Link href={`/freelancer/${freelancer.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20">
                    View Profile →
                  </Button>
                </Link>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center text-slate-100 py-12">
               No featured talent available at the moment.
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
