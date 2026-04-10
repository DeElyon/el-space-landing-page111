import React from 'react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
