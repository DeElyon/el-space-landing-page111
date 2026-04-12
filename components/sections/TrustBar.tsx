import { ECOSYSTEM_BRANDS } from '@/lib/constants'

export function TrustBar() {
  return (
    <section className="border-y border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-slate-900/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-semibold text-slate-400 uppercase tracking-wide">
          Backed by EL VERSE TECHNOLOGIES Ecosystem
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {ECOSYSTEM_BRANDS.map((brand, idx) => (
            <div key={brand} className="flex items-center gap-4">
              <span className="font-semibold text-slate-300 hover:text-cyan-400 transition-colors">{brand}</span>
              {idx < ECOSYSTEM_BRANDS.length - 1 && (
                <div className="h-6 w-px bg-slate-700/50"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
