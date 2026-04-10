import { HERO_CLIENT, HERO_FREELANCER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* EL SPACE branding section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-500 bg-cyan-500/10 px-4 py-2 rounded-full">
              Welcome to
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-4 text-balance">
            EL SPACE
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2">
            The Future of Freelance Excellence
          </p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Connect with top talent or find your next opportunity. Build your career with trust, quality, and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Client Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-accent/10 px-4 py-2">
              <span className="text-sm font-semibold text-accent">
                {HERO_CLIENT.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground text-balance">
              {HERO_CLIENT.headline}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {HERO_CLIENT.subheadline}
            </p>
            <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
              <p className="text-sm font-semibold text-amber-400">
                {HERO_CLIENT.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-fit">
              <Button
                size="lg"
                className="bg-amber-400 text-white hover:bg-amber-400/90"
              >
                {HERO_CLIENT.cta} →
              </Button>
            </Link>
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
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground text-balance">
              {HERO_FREELANCER.headline}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {HERO_FREELANCER.subheadline}
            </p>
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-semibold text-accent">
                {HERO_FREELANCER.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-fit">
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent/10"
              >
                {HERO_FREELANCER.cta} →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
