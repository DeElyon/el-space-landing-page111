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
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900/50 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust & Safety */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 border-cyan-500/50 bg-cyan-500/10 text-cyan-300">TRUST & SAFETY</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Built for Safety & Trust</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We prioritize security and fairness for both clients and freelancers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 bg-slate-900/40 backdrop-blur-sm hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-cyan-400 mb-2" />
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 mb-3">{feature.description}</p>
                    <Badge variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-300 border-0">{feature.highlight}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Smart Matching */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 border-purple-500/50 bg-purple-500/10 text-purple-300">MATCHING & DISCOVERY</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Smarter Matching</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              AI-powered algorithm connects you with perfect-fit projects and talent
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {matchingFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 bg-slate-900/40 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-purple-400 mb-2" />
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 mb-3">{feature.description}</p>
                    <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-0">{feature.highlight}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payments & Earnings */}
        <div>
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 border-emerald-500/50 bg-emerald-500/10 text-emerald-300">PAYMENTS & EARNINGS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get Paid Faster</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Flexible payment options with industry-leading withdrawal speeds
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {paymentFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 bg-slate-900/40 backdrop-blur-sm hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-emerald-400 mb-2" />
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 mb-3">{feature.description}</p>
                    <Badge variant="secondary" className="text-xs bg-emerald-500/20 text-emerald-300 border-0">{feature.highlight}</Badge>
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
