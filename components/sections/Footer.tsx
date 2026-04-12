import { FOOTER_SECTIONS } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { AdminLoginDialog } from '@/components/admin-login-dialog'

export function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Sections */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 mb-12">
          {/* About */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                EL
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                EL SPACE
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold text-slate-300">
              {FOOTER_SECTIONS.about.subtitle}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              {FOOTER_SECTIONS.about.description}
            </p>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="mb-6 font-bold text-white text-lg">
              {FOOTER_SECTIONS.forClients.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_SECTIONS.forClients.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h4 className="mb-6 font-bold text-white text-lg">
              {FOOTER_SECTIONS.forFreelancers.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_SECTIONS.forFreelancers.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-purple-400 transition-colors duration-200"
                  >
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="mb-6 font-bold text-white text-lg">
              {FOOTER_SECTIONS.ecosystem.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_SECTIONS.ecosystem.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 font-bold text-white text-lg">
              {FOOTER_SECTIONS.legal.title}
            </h4>
            <ul className="space-y-3">
              {FOOTER_SECTIONS.legal.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50 pt-8 mt-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8">
          <p className="text-center md:text-left text-sm text-slate-400">
            © 2026 EL SPACE. Building the Future of Freelance. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <AdminLoginDialog />
          </div>
        </div>
      </div>
    </footer>
  )
}
