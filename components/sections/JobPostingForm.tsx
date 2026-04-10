'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function JobPostingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    skills: '',
    budget: '',
    timeline: '',
    email: '',
    company: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  return (
    <div className="max-w-2xl mx-auto rounded-lg border border-border bg-card p-8">
      <h3 className="mb-2 text-2xl font-bold text-foreground">Post a Job</h3>
      <p className="mb-6 text-muted-foreground">Find the perfect freelancer in 5 minutes.</p>

      {/* Progress */}
      <div className="mb-8 flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? 'bg-accent' : 'bg-border'
            }`}
          ></div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Project Title
            </label>
            <Input
              placeholder="e.g., Build a React dashboard"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Category
            </label>
            <Select value={formData.category} onValueChange={(val) => handleChange('category', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Project Description
            </label>
            <Textarea
              placeholder="Tell us about your project..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Required Skills
            </label>
            <Input
              placeholder="e.g., React, TypeScript, Tailwind (comma-separated)"
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Budget Range
            </label>
            <Input
              placeholder="e.g., $1,000 - $5,000"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Timeline
            </label>
            <Select value={formData.timeline} onValueChange={(val) => handleChange('timeline', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1week">1 week</SelectItem>
                <SelectItem value="2weeks">2 weeks</SelectItem>
                <SelectItem value="1month">1 month</SelectItem>
                <SelectItem value="3months">3+ months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Company Name (Optional)
            </label>
            <Input
              placeholder="Your company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex gap-4">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 4 && (
          <Button onClick={handleNext} className="flex-1 bg-accent text-white hover:bg-accent/90">
            Continue
          </Button>
        )}
        {step === 4 && (
          <Button onClick={handleSubmit} className="flex-1 bg-amber-400 text-white hover:bg-amber-400/90">
            Post Job (Free)
          </Button>
        )}
      </div>
    </div>
  )
}
