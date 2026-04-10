import React from 'react'

interface StepCardProps {
  icon: string
  title: string
  description: string
  step?: number
}

export function StepCard({ icon, title, description, step }: StepCardProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg">
      <div className="text-4xl">{icon}</div>
      <div>
        {step && (
          <p className="mb-2 text-sm font-semibold text-accent">
            Step {step}
          </p>
        )}
        <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
