import { HERO_CLIENT, HERO_FREELANCER } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Client Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-accent/10 px-4 py-2">
              <span className="text-sm font-semibold text-accent">
                {HERO_CLIENT.badge}
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl text-balance">
              {HERO_CLIENT.headline}
            </h1>
            <p className="text-lg text-muted-foreground">
              {HERO_CLIENT.subheadline}
            </p>
            <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
              <p className="text-sm font-semibold text-amber-400">
                {HERO_CLIENT.fee}
              </p>
            </div>
            <Button
              size="lg"
              className="w-fit bg-amber-400 text-white hover:bg-amber-400/90"
            >
              {HERO_CLIENT.cta} →
            </Button>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden h-auto w-px bg-gradient-to-b from-transparent via-border to-transparent md:block"></div>

          {/* Freelancer Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-accent/10 px-4 py-2">
              <span className="text-sm font-semibold text-accent">
                {HERO_FREELANCER.badge}
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-foreground md:text-5xl text-balance">
              {HERO_FREELANCER.headline}
            </h2>
            <p className="text-lg text-muted-foreground">
              {HERO_FREELANCER.subheadline}
            </p>
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-semibold text-accent">
                {HERO_FREELANCER.fee}
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="w-fit border-accent text-accent hover:bg-accent/10"
            >
              {HERO_FREELANCER.cta} →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
