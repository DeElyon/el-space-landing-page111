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
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {subheading && (
        <p className="mb-2 text-sm font-semibold text-accent uppercase tracking-wide">
          {subheading}
        </p>
      )}
      <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
        {heading}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
