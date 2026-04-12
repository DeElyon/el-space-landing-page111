'use client'

import { useState } from 'react'
import { PRICING_CLIENT_TABLE, PRICING_FREELANCER_TABLE } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Pricing() {
  const [activeTab, setActiveTab] = useState('clients')

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900/50 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Simple, Fair Pricing"
          subheading="Transparent & Competitive"
          description="No hidden fees. No surprises. Just straightforward pricing that scales with your project size. We believe in fairness for everyone."
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-12 bg-slate-800/50 border border-slate-700/50 p-1 rounded-lg">
            <TabsTrigger value="clients" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md">For Clients</TabsTrigger>
            <TabsTrigger value="freelancers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-md">For Freelancers</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <div className="overflow-x-auto rounded-lg border border-slate-700/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/30">
                    <th className="px-6 py-4 text-left font-bold text-white">
                      Project Size
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-white">
                      Your Fee
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-white">
                      Example Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_CLIENT_TABLE.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">{row.size}</p>
                          <p className="text-xs text-slate-400 mt-1">{row.range}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-cyan-400 text-lg">{row.fee}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {row.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Callout */}
            <div className="rounded-lg border border-gradient-to-r from-emerald-500/30 to-green-500/30 bg-gradient-to-r from-emerald-500/5 to-green-500/5 p-8">
              <p className="text-center font-bold text-white text-lg leading-relaxed">
                Upwork takes <span className="text-red-400">20%</span>. Fiverr takes <span className="text-red-400">20%</span>.{' '}
                <span className="text-green-400 text-xl">EL SPACE takes just 3-5%</span><br />
                <span className="text-slate-300 text-base font-normal">Keep 95-97% of what you earn</span>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="freelancers" className="space-y-6">
            <div className="overflow-x-auto rounded-lg border border-slate-700/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/30">
                    <th className="px-6 py-4 text-left font-bold text-white">
                      Project Size
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-white">
                      Your Fee
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-white">
                      Example Payout
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_FREELANCER_TABLE.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">{row.size}</p>
                          <p className="text-xs text-slate-400 mt-1">{row.range}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-green-400 text-lg">{row.fee}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-400">
                        {row.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Callout */}
            <div className="rounded-lg border border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6">
              <p className="text-center font-semibold text-white">
                Keep up to{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">97% of your earnings</span>
                <br />
                <span className="text-slate-300">Get paid today, not in 30 days.</span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
