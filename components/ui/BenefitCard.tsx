import React from 'react'

interface BenefitCardProps {
  title: string
  description: string
  icon?: string
  colorScheme?: 'cyan' | 'purple' | 'green' | 'blue' | 'yellow' | 'pink'
}

const iconBackgrounds = {
  cyan: 'bg-cyan-500/20 text-cyan-400',
  purple: 'bg-purple-500/20 text-purple-400',
  green: 'bg-emerald-500/20 text-emerald-400',
  blue: 'bg-blue-500/20 text-blue-400',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  pink: 'bg-pink-500/20 text-pink-400'
}

export function BenefitCard({ 
  title, 
  description, 
  icon = '✓',
  colorScheme = 'cyan'
}: BenefitCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm hover:border-slate-600/50 transition-all">
      <div className="flex items-start gap-4">
        <span className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold ${iconBackgrounds[colorScheme]} border border-opacity-20`}>
          {icon}
        </span>
        <div className="flex-1">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}
