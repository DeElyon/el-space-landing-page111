'use client'

import { useState } from 'react'
import { PRICING_CLIENT_TABLE, PRICING_FREELANCER_TABLE } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Pricing() {
  const [activeTab, setActiveTab] = useState('clients')

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Simple, Fair Pricing"
          subheading="Transparent Pricing"
          description="Tiered fees mean small projects stay affordable. Large projects stay profitable for everyone."
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="clients">For Clients</TabsTrigger>
            <TabsTrigger value="freelancers">For Freelancers</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Project Size
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Your Fee
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_CLIENT_TABLE.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-foreground">{row.size}</p>
                          <p className="text-xs text-muted-foreground">{row.range}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-accent">{row.fee}</p>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {row.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Callout */}
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
              <p className="text-center font-semibold text-foreground">
                Upwork takes 20%. Fiverr takes 20%.{' '}
                <span className="text-accent">EL SPACE takes 3-5%</span> or a
                simple flat fee. You do the math.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="freelancers" className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Project Size
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Your Fee
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_FREELANCER_TABLE.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-foreground">{row.size}</p>
                          <p className="text-xs text-muted-foreground">{row.range}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-amber-400">{row.fee}</p>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {row.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Callout */}
            <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-6">
              <p className="text-center font-semibold text-foreground">
                Keep up to{' '}
                <span className="text-amber-400">97% of your earnings</span>. Get
                paid today, not in 30 days.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
