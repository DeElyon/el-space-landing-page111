import { HERO_CLIENT, HERO_FREELANCER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, Shield, TrendingUp, Users } from 'lucide-react'

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50 to-white py-16 md:py-24 lg:py-32">
      {/* Premium animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Red glow top-right */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        {/* Gold glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        {/* Red accent */}
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-50/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* EL SPACE branding section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-transparent bg-gradient-to-r from-red-600 to-red-500 bg-clip-text px-4 py-2 rounded-full flex items-center gap-2 transition-all border border-red-500/30 hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <Zap className="w-4 h-4" />
              ✨ Trusted by 10,000+ Professionals
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-gold bg-clip-text text-transparent inline-block animate-pulse">EL</span>
            <span className="text-black ml-3">SPACE</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-red-600 to-gold bg-clip-text text-transparent mb-4 font-bold">
            Freelance Without the Friction
          </p>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Where top talent meets great opportunities. Escrow-protected payments, vetted professionals, instant payouts. Your next great project starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 mb-12">
          {/* Client Side */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block max-w-max rounded-full bg-gradient-to-r from-red-500/20 to-gold/10 px-4 py-2 border border-red-500/30">
              <span className="text-sm font-semibold bg-gradient-to-r from-red-600 to-gold bg-clip-text text-transparent flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" />
                {HERO_CLIENT.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-black text-balance">
              {HERO_CLIENT.headline}
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              {HERO_CLIENT.subheadline}
            </p>
            
            {/* Quick Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-all">
                <div className="p-2 bg-red-500/20 rounded-lg mt-0.5">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Escrow Protection</p>
                  <p className="text-sm text-gray-600">100% payment secured</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 transition-all">
                <div className="p-2 bg-gold/20 rounded-lg mt-0.5">
                  <Zap className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Instant Payouts</p>
                  <p className="text-sm text-gray-600">Get paid in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-all">
                <div className="p-2 bg-red-500/20 rounded-lg mt-0.5">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Vetted Talent</p>
                  <p className="text-sm text-gray-600">Top 5% professionals only</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gold/30 bg-gradient-to-br from-gold/10 to-gold/5 p-4 hover:border-gold/60 transition-all">
              <p className="text-sm font-semibold bg-gradient-to-r from-gold to-gold bg-clip-text text-transparent">
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
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-black text-balance">
              {HERO_FREELANCER.headline}
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              {HERO_FREELANCER.subheadline}
            </p>

            {/* Quick Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 transition-all">
                <div className="p-2 bg-gold/20 rounded-lg mt-0.5">
                  <Zap className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Work You Love</p>
                  <p className="text-sm text-gray-600">Choose projects that excite you</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-all">
                <div className="p-2 bg-red-500/20 rounded-lg mt-0.5">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Secure Payments</p>
                  <p className="text-sm text-gray-600">Escrow-backed protection</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 transition-all">
                <div className="p-2 bg-gold/20 rounded-lg mt-0.5">
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Grow Your Career</p>
                  <p className="text-sm text-gray-600">Build portfolio & reputation</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5 p-4 hover:border-red-500/60 transition-all">
              <p className="text-sm font-semibold bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent">
                {HERO_FREELANCER.fee}
              </p>
            </div>
            <Link href="/auth/register" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-gold to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-bold text-lg py-6 rounded-lg transition-all hover:shadow-lg hover:shadow-gold/50 active:scale-95"
              >
                {HERO_FREELANCER.cta} →
              </Button>
            </Link>
          </div>
        </div>

        {/* New Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 pt-12 border-t border-gray-200">
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent mb-2">10K+</div>
            <p className="text-sm text-gray-700 font-semibold">Active Users</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-gold to-gold bg-clip-text text-transparent mb-2">500+</div>
            <p className="text-sm text-gray-700 font-semibold">Projects Done</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent mb-2">$2M+</div>
            <p className="text-sm text-gray-700 font-semibold">Paid Out</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-gold to-gold bg-clip-text text-transparent mb-2">98%</div>
            <p className="text-sm text-gray-700 font-semibold">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
