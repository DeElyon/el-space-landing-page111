import { HERO_CLIENT, HERO_FREELANCER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, Shield, TrendingUp, Users } from 'lucide-react'

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24 lg:py-32">
      {/* Premium animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cyan glow top-right */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        {/* Purple glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        {/* Pink accent */}
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* EL SPACE branding section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text px-4 py-2 rounded-full flex items-center gap-2 transition-all border border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Zap className="w-4 h-4" />
              ✨ Trusted by 10,000+ Professionals
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block animate-pulse">EL</span>
            <span className="text-white ml-3">SPACE</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4 font-bold">
            Freelance Without the Friction
          </p>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Where top talent meets great opportunities. Escrow-protected payments, vetted professionals, instant payouts. Your next great project starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 mb-12">
          {/* Client Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/10 px-4 py-2 border border-cyan-500/30">
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                {HERO_CLIENT.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white text-balance">
              {HERO_CLIENT.headline}
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              {HERO_CLIENT.subheadline}
            </p>
            
            {/* Quick Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
                <div className="p-2 bg-green-500/20 rounded-lg mt-0.5">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Escrow Protection</p>
                  <p className="text-sm text-slate-400">100% payment secured</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <div className="p-2 bg-cyan-500/20 rounded-lg mt-0.5">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Instant Payouts</p>
                  <p className="text-sm text-slate-400">Get paid in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="p-2 bg-purple-500/20 rounded-lg mt-0.5">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Vetted Talent</p>
                  <p className="text-sm text-slate-400">Top 5% professionals only</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-4 hover:border-green-500/60 transition-all">
              <p className="text-sm font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {HERO_CLIENT.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg py-6 rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
              >
                {HERO_CLIENT.cta} →
              </Button>
            </Link>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden h-auto w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent md:block"></div>

          {/* Freelancer Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/10 px-4 py-2 border border-purple-500/30">
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                {HERO_FREELANCER.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white text-balance">
              {HERO_FREELANCER.headline}
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              {HERO_FREELANCER.subheadline}
            </p>

            {/* Quick Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="p-2 bg-purple-500/20 rounded-lg mt-0.5">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Work You Love</p>
                  <p className="text-sm text-slate-400">Choose projects that excite you</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
                <div className="p-2 bg-green-500/20 rounded-lg mt-0.5">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Secure Payments</p>
                  <p className="text-sm text-slate-400">Escrow-backed protection</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="p-2 bg-blue-500/20 rounded-lg mt-0.5">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Grow Your Career</p>
                  <p className="text-sm text-slate-400">Build portfolio & reputation</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-4 hover:border-purple-500/60 transition-all">
              <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {HERO_FREELANCER.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
              >
                {HERO_FREELANCER.cta} →
              </Button>
            </Link>
          </div>
        </div>

        {/* New Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 pt-12 border-t border-slate-700/50">
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">10K+</div>
            <p className="text-sm text-slate-300 font-semibold">Active Users</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">500+</div>
            <p className="text-sm text-slate-300 font-semibold">Projects Done</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-2">$2M+</div>
            <p className="text-sm text-slate-300 font-semibold">Paid Out</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">98%</div>
            <p className="text-sm text-slate-300 font-semibold">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
