'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function EarningsCalculator() {
  const [projectValue, setProjectValue] = useState(5000)
  const [userType, setUserType] = useState<'freelancer' | 'client'>('freelancer')

  // Calculate fees
  const calculateFee = (amount: number, userType: 'freelancer' | 'client') => {
    let fee = 0
    if (amount < 500) {
      fee = userType === 'freelancer' ? 9 : 19
    } else if (amount < 5000) {
      fee = amount * 0.05
    } else {
      fee = amount * 0.03
    }
    return fee
  }

  const fee = calculateFee(projectValue, userType)
  const earnings = userType === 'freelancer' ? projectValue - fee : projectValue + fee

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="How Much Will You Make (or Pay)?"
          subheading="Earnings Calculator"
          description="Calculate your take-home earnings or see what you'll pay as a client."
        />

        <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-8 md:p-12">
          <Tabs value={userType} onValueChange={(val) => setUserType(val as any)} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900/50 border border-slate-700/50">
              <TabsTrigger value="freelancer" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white">Freelancer View</TabsTrigger>
              <TabsTrigger value="client" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white">Client View</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Slider */}
          <div className="mb-8">
            <label className="mb-4 block text-sm font-semibold text-white">
              Project Value: <span className="text-cyan-400">${projectValue.toLocaleString()}</span>
            </label>
            <Slider
              value={[projectValue]}
              onValueChange={(val) => setProjectValue(val[0])}
              min={100}
              max={20000}
              step={100}
              className="w-full"
            />
            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>$100</span>
              <span>$20,000</span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {userType === 'freelancer' ? (
              <>
                <div className="rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 p-6">
                  <p className="mb-2 text-sm text-slate-400">EL SPACE Fee</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    ${fee.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6">
                  <p className="mb-2 text-sm text-slate-400">You Earn</p>
                  <p className="text-4xl font-bold text-emerald-400">
                    ${earnings.toFixed(2)}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    That&apos;s {((earnings / projectValue) * 100).toFixed(1)}% of the project value
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 p-6">
                  <p className="mb-2 text-sm text-slate-400">EL SPACE Fee</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    ${fee.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-6">
                  <p className="mb-2 text-sm text-slate-400">You Pay</p>
                  <p className="text-4xl font-bold text-cyan-400">
                    ${earnings.toFixed(2)}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    That&apos;s only {((fee / projectValue) * 100).toFixed(1)}% above project cost
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Comparison */}
          <div className="mt-8 border-t border-slate-700/50 pt-8">
            <p className="mb-4 text-center text-sm text-slate-400">
              Compare to other platforms:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
                <span className="font-semibold text-white">Upwork</span>
                <span className="text-lg font-bold text-white">20%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
                <span className="font-semibold text-white">Fiverr</span>
                <span className="text-lg font-bold text-white">20%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 p-3">
                <span className="font-semibold text-white">EL SPACE</span>
                <span className="text-lg font-bold text-cyan-400">3-5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
