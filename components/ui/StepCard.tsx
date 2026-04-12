import React from 'react'

interface StepCardProps {
  icon: string
  title: string
  description: string
  step?: number
}

const stepColors = [
  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'bg-blue-500/20 text-blue-400 border-blue-500/30'
]

export function StepCard({ icon, title, description, step }: StepCardProps) {
  const colorClass = step ? stepColors[(step - 1) % stepColors.length] : ''
  const glowClass = step ? [
    'hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]',
    'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    'hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]'
  ][(step - 1) % 4] : ''

  return (
    <div className={`flex flex-col items-start gap-4 rounded-lg border border-slate-700/50 ${colorClass.split(' ')[0]} bg-slate-900/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-opacity-100 ${glowClass}`}>
      <div className={`text-4xl rounded-lg p-2 ${colorClass.split(' ').slice(0, 2).join(' ')}`}>
        {icon}
      </div>
      <div className="flex-1">
        {step && (
          <p className={`mb-2 text-sm font-semibold ${colorClass.split(' ')[1]}`}>
            Step {step}
          </p>
        )}
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </div>
    </div>
  )
}
