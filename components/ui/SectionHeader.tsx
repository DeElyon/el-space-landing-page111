import React from 'react'

interface SectionHeaderProps {
  subheading?: string
  heading: string
  description?: string
  centered?: boolean
}

export function SectionHeader({
  subheading,
  heading,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {subheading && (
        <p className="mb-3 text-xs sm:text-sm font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-widest">
          {subheading}
        </p>
      )}
      <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white text-balance leading-tight">
        {heading}
      </h2>
      {description && (
        <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
