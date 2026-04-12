import { HERO_CLIENT, HERO_FREELANCER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, Shield, TrendingUp, Users } from 'lucide-react'

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-purple-950/20 to-background py-16 md:py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* EL SPACE branding section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
              <Zap className="w-4 h-4" />
              ✨ Trusted by 10,000+ Professionals
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 animated-gradient">
            EL SPACE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-4 font-bold">
            Freelance Without the Friction
          </p>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Where top talent meets great opportunities. Escrow-protected payments, vetted professionals, instant payouts. Your next great project starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 mb-12">
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
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg mt-0.5">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Escrow Protection</p>
                  <p className="text-sm text-slate-400">100% payment secured</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Instant Payouts</p>
                  <p className="text-sm text-slate-400">Get paid in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg mt-0.5">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Vetted Talent</p>
                  <p className="text-sm text-slate-400">Top 5% professionals only</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <p className="text-sm font-semibold text-green-400">
                {HERO_CLIENT.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg py-6 rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50"
              >
                {HERO_CLIENT.cta} →
              </Button>
            </Link>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden h-auto w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent md:block"></div>

          {/* Freelancer Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-purple-500/10 px-4 py-2">
              <span className="text-sm font-semibold text-purple-300 flex items-center gap-2">
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
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg mt-0.5">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Work You Love</p>
                  <p className="text-sm text-slate-400">Choose projects that excite you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg mt-0.5">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Secure Payments</p>
                  <p className="text-sm text-slate-400">Escrow-backed protection</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Grow Your Career</p>
                  <p className="text-sm text-slate-400">Build portfolio & reputation</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
              <p className="text-sm font-semibold text-purple-400">
                {HERO_FREELANCER.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/50"
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
            <p className="text-sm text-slate-100">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
            <p className="text-sm text-slate-100">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">$2M+</div>
            <p className="text-sm text-slate-100">Total Payments</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
            <p className="text-sm text-slate-100">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
