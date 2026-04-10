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
    <section className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          heading="Frequently Asked Questions"
          description="Everything you need to know about EL SPACE."
        />

        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="clients">For Clients</TabsTrigger>
            <TabsTrigger value="freelancers">For Freelancers</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Accordion type="single" collapsible className="w-full">
              {clientFAQ.map((item, idx) => (
                <AccordionItem key={idx} value={`client-${idx}`}>
                  <AccordionTrigger className="text-left hover:text-accent">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="freelancers">
            <Accordion type="single" collapsible className="w-full">
              {freelancerFAQ.map((item, idx) => (
                <AccordionItem key={idx} value={`freelancer-${idx}`}>
                  <AccordionTrigger className="text-left hover:text-accent">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
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
