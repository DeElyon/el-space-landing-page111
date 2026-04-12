import React from 'react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
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

const borderColors = {
  cyan: 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]',
  purple: 'hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  green: 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  blue: 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  yellow: 'hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]',
  pink: 'hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]'
}

export function FeatureCard({ 
  icon, 
  title, 
  description,
  colorScheme = 'cyan'
}: FeatureCardProps) {
  return (
    <div className={`rounded-lg border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-opacity-100 ${borderColors[colorScheme]}`}>
      <div className={`mb-4 inline-block p-3 rounded-lg ${iconBackgrounds[colorScheme]} text-3xl`}>
        {icon}
      </div>
      <h3 className="mb-2 font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}
