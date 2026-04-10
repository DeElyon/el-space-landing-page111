'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Zap, Users, TrendingUp, Lock } from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Verified Badge System',
    description: 'Three-tier verification: Portfolio Reviewed → Test Project Passed → ELACCESS Graduate',
    highlight: 'Clients filter for 🥇 only',
  },
  {
    icon: Lock,
    title: 'Escrow Protection',
    description: 'Stripe Connect holds funds. Milestone-based release protects both parties.',
    highlight: 'Safe for projects up to $100k+',
  },
  {
    icon: CheckCircle2,
    title: 'Identity Verification',
    description: 'Government ID + video selfie check (optional but recommended).',
    highlight: 'Eliminates fake profiles',
  },
];

const matchingFeatures = [
  {
    icon: Zap,
    title: 'Smart Matching Algorithm',
    description: 'Skills + Budget + Timeline + Availability = Top 5 matches',
    highlight: 'No browsing 1,000 profiles',
  },
  {
    icon: TrendingUp,
    title: 'Instant Availability Badge',
    description: '🟢 "Available This Week" filter keeps you matched with active freelancers.',
    highlight: 'Active freelancers get priority',
  },
  {
    icon: Users,
    title: 'Skill-Based Search',
    description: 'Filter by exact tech stack: React, Python, Figma, Webflow, etc.',
    highlight: 'Precision hiring, every time',
  },
];

const paymentFeatures = [
  {
    icon: TrendingUp,
    title: 'Instant Pay',
    description: 'Withdraw earnings to bank/crypto/PayPal in minutes. 5% fee.',
    highlight: 'Major differentiator',
  },
  {
    icon: Zap,
    title: 'Real-Time Earnings Dashboard',
    description: 'See total earned, pending, available, and withdrawn instantly.',
    highlight: 'Financial clarity',
  },
  {
    icon: Lock,
    title: 'Multi-Currency Support',
    description: 'USD, EUR, GBP, NGN, KES, ZAR and more.',
    highlight: 'Global payment network',
  },
];

export function TrustSafetyFeatures() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust & Safety */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">TRUST & SAFETY</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Safety & Trust</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We prioritize security and fairness for both clients and freelancers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="hover:border-accent transition-colors">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-accent mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <Badge variant="secondary" className="text-xs">{feature.highlight}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Smart Matching */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">MATCHING & DISCOVERY</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smarter Matching</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI-powered algorithm connects you with perfect-fit projects and talent
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {matchingFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="hover:border-accent transition-colors">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-cyan mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <Badge variant="secondary" className="text-xs">{feature.highlight}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payments & Earnings */}
        <div>
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">PAYMENTS & EARNINGS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Paid Faster</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible payment options with industry-leading withdrawal speeds
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {paymentFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="hover:border-accent transition-colors">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-amber mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <Badge variant="secondary" className="text-xs">{feature.highlight}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
