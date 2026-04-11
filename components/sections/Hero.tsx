import { HERO_CLIENT, HERO_FREELANCER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, Shield, TrendingUp, Users } from 'lucide-react'

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* EL SPACE branding section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-500 bg-cyan-500/10 px-4 py-2 rounded-full flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Trusted by Industry Leaders
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-4 text-balance">
            EL SPACE
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 font-semibold">
            The Future of Freelance Excellence
          </p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with top talent or find your next opportunity. Build your career with trust, quality, and excellence. Join thousands of professionals already transforming their work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Client Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-accent/10 px-4 py-2">
              <span className="text-sm font-semibold text-accent flex items-center gap-2">
                <Users className="w-4 h-4" />
                {HERO_CLIENT.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground text-balance">
              {HERO_CLIENT.headline}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {HERO_CLIENT.subheadline}
            </p>
            
            {/* Quick Benefits */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">Vetted professionals with proven track records</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">Fast turnaround and dedicated support</p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">Scale your projects with confidence</p>
              </div>
            </div>

            <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
              <p className="text-sm font-semibold text-amber-400">
                {HERO_CLIENT.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-fit">
              <Button
                size="lg"
                className="bg-amber-400 text-white hover:bg-amber-400/90 font-semibold"
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
              <span className="text-sm font-semibold text-accent flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {HERO_FREELANCER.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground text-balance">
              {HERO_FREELANCER.headline}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {HERO_FREELANCER.subheadline}
            </p>

            {/* Quick Benefits */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">Choose projects that match your expertise</p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">Secure payments and milestone protection</p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">Grow your skills and build your portfolio</p>
              </div>
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-semibold text-accent">
                {HERO_FREELANCER.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-fit">
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent/10 font-semibold"
              >
                {HERO_FREELANCER.cta} →
              </Button>
            </Link>
          </div>
        </div>

        {/* New Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-slate-700/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
            <p className="text-sm text-slate-400">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
            <p className="text-sm text-slate-400">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">$2M+</div>
            <p className="text-sm text-slate-400">Total Payments</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
            <p className="text-sm text-slate-400">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
