import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-accent/20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            Ready to Transform Your Freelance Career?
          </h2>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of talented freelancers and forward-thinking clients already using EL SPACE to build amazing projects together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Post a Job Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold"
            >
              Apply as a Freelancer
            </Button>
          </div>

          <p className="text-sm text-white/70 pt-4">
            No credit card required • Free to post • Start earning today
          </p>
        </div>
      </div>
    </section>
  )
}
