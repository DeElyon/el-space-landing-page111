import { FOOTER_SECTIONS } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Sections */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 mb-8">
          {/* About */}
          <div>
            <div className="relative h-10 w-40 mb-4">
              <Image
                src="/logo.png"
                alt="EL SPACE"
                fill
                className="object-contain"
              />
            </div>
            <p className="mb-2 text-sm text-muted-foreground font-semibold">
              {FOOTER_SECTIONS.about.subtitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {FOOTER_SECTIONS.about.description}
            </p>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              {FOOTER_SECTIONS.forClients.title}
            </h4>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.forClients.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              {FOOTER_SECTIONS.forFreelancers.title}
            </h4>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.forFreelancers.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              {FOOTER_SECTIONS.ecosystem.title}
            </h4>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.ecosystem.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              {FOOTER_SECTIONS.legal.title}
            </h4>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.legal.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 EL VERSE TECHNOLOGIES. Freelance Without Friction.
          </p>
        </div>
      </div>
    </footer>
  )
}
