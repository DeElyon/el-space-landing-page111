import React from 'react'

interface BenefitCardProps {
  title: string
  description: string
  icon?: string
}

export function BenefitCard({ title, description, icon = '✓' }: BenefitCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-white">
          {icon}
        </span>
        <div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
