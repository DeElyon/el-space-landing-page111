import { FEATURES } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FeatureCard } from '@/components/ui/FeatureCard'

export function Features() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subheading="More Than a Marketplace"
          heading="Tools That Make Freelancing Effortless"
          description="Everything you need to succeed on EL SPACE."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <div key={idx}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
