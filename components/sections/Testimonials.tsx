import { TESTIMONIALS } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900/50 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subheading="Real Results"
          heading="What Our Community Says"
          description="Stories from clients and freelancers who&apos;ve transformed their work."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, idx) => {
            const isClient = testimonial.type === 'client'
            const borderGradient = isClient 
              ? 'border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]'
              : 'border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]'
            const bgGradient = isClient 
              ? 'from-cyan-500/10 to-blue-500/5'
              : 'from-purple-500/10 to-pink-500/5'
            const badge = isClient ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
            
            return (
              <div
                key={idx}
                className={`rounded-lg border ${borderGradient} bg-gradient-to-br ${bgGradient} bg-slate-900/40 backdrop-blur-sm p-8 transition-all duration-300`}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-xl">
                      ⭐
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-lg font-medium text-white leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mt-2 ${badge}`}>
                      {testimonial.type === 'client' ? 'Client' : 'Freelancer'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
