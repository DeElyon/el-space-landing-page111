import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Decorative gradient backgrounds */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            Ready to Transform Your<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Freelance Career?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Join thousands of talented freelancers and forward-thinking clients already using EL SPACE to build amazing projects together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 font-semibold shadow-lg"
              >
                Post a Job Today
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-500/20 hover:border-purple-300 font-semibold"
              >
                Apply as a Freelancer
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-400 pt-4">
            No credit card required • Free to post • Start earning today
          </p>
        </div>
      </div>
    </section>
  )
}
