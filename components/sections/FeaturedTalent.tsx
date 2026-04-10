import { FEATURED_FREELANCERS } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'

export function FeaturedTalent() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subheading="Meet Our Vetted Freelancers"
          heading="Top 5% of Tech Talent. Ready This Week."
          description="Handpicked professionals ready to bring your vision to life."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURED_FREELANCERS.map((freelancer, idx) => (
            <div
              key={freelancer.id}
              className="rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
            >
              {/* Avatar Placeholder */}
              <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-accent to-primary/80 flex items-center justify-center text-2xl font-bold text-white">
                {freelancer.name.charAt(0)}
              </div>

              {/* Name & Title */}
              <h3 className="mb-1 font-bold text-foreground">{freelancer.name}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{freelancer.title}</p>

              {/* Badges */}
              <div className="mb-3 space-y-1">
                {freelancer.badges.map((badge, idx) => (
                  <p key={idx} className="text-xs text-accent font-medium">
                    {badge}
                  </p>
                ))}
              </div>

              {/* Skills */}
              <div className="mb-4 flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Rate & Availability */}
              <div className="mb-4 border-t border-border pt-4">
                <p className="mb-2 text-sm font-semibold text-amber-400">
                  {freelancer.hourlyRate}
                </p>
                <p className="text-xs text-muted-foreground">
                  {freelancer.availability}
                </p>
              </div>

              {/* CTA */}
              <Button variant="outline" size="sm" className="w-full">
                View Profile →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
