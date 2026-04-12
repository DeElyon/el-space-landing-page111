'use client'

import { FAQ_ITEMS } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function FAQ() {
  const clientFAQ = FAQ_ITEMS.filter((item) => item.category === 'client')
  const freelancerFAQ = FAQ_ITEMS.filter((item) => item.category === 'freelancer')

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Frequently Asked Questions"
          description="Everything you need to know about EL SPACE."
        />

        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900/50 border border-slate-700/50">
            <TabsTrigger value="clients" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              For Clients
            </TabsTrigger>
            <TabsTrigger value="freelancers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              For Freelancers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Accordion type="single" collapsible className="w-full">
              {clientFAQ.map((item, idx) => (
                <AccordionItem key={idx} value={`client-${idx}`} className="border-slate-700/50 data-[state=open]:bg-slate-900/40">
                  <AccordionTrigger className="text-white hover:text-cyan-400 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="freelancers">
            <Accordion type="single" collapsible className="w-full">
              {freelancerFAQ.map((item, idx) => (
                <AccordionItem key={idx} value={`freelancer-${idx}`} className="border-slate-700/50 data-[state=open]:bg-slate-900/40">
                  <AccordionTrigger className="text-white hover:text-purple-400 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
