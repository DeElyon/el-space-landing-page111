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
    <section className="py-16 md:py-24 lg:py-32">
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
                className="rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg flex flex-col h-full"
              >
                {/* Avatar Placeholder */}
                <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-accent to-primary/80 flex items-center justify-center text-2xl font-bold text-white">
                  {freelancer.name.charAt(0)}
                </div>

                {/* Name & Title */}
                <h3 className="mb-1 font-bold text-foreground">{freelancer.name}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{freelancer.title}</p>

                {/* Skills */}
                <div className="mb-4 flex flex-wrap gap-2 flex-grow">
                  {freelancer.skills.slice(0, 3).map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Rate & Availability */}
                <div className="mb-4 border-t border-border pt-4 mt-auto">
                  <p className="mb-2 text-sm font-semibold text-amber-400">
                    {freelancer.hourlyRate}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {freelancer.availability}
                  </p>
                </div>

                {/* CTA */}
                <Link href={`/freelancer/${freelancer.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile →
                  </Button>
                </Link>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center text-slate-400 py-12">
               No featured talent available at the moment.
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
