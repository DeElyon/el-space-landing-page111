# EL SPACE - Development Roadmap & Feature Guide

## 🗂️ Database Schema (Supabase/Firebase)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_type ENUM('client', 'freelancer') NOT NULL,
  verified_badge INT DEFAULT 0,  -- 0: None, 1: Portfolio, 2: Test Passed, 3: ELACCESS
  avatar_url VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Freelancer Profile Table
```sql
CREATE TABLE freelancer_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  hourly_rate DECIMAL(10,2),
  years_experience INT,
  portfolio_url VARCHAR(255),
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  skills JSONB,  -- ['React', 'TypeScript', 'Tailwind']
  total_earnings DECIMAL(12,2),
  total_projects INT,
  avg_rating DECIMAL(3,2),
  availability_status ENUM('available', 'busy', 'unavailable')
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  required_skills JSONB,
  timeline VARCHAR(50),
  status ENUM('draft', 'open', 'in_progress', 'completed', 'cancelled'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Milestones Table
```sql
CREATE TABLE milestones (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  freelancer_id UUID REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  amount DECIMAL(10,2),
  status ENUM('pending', 'in_progress', 'submitted', 'approved', 'released'),
  due_date DATE,
  created_at TIMESTAMP
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  reviewer_id UUID REFERENCES users(id),
  reviewee_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  rating INT (1-5),
  comment TEXT,
  is_public BOOLEAN,
  created_at TIMESTAMP
);
```

### OTP Sessions Table
```sql
CREATE TABLE otp_sessions (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6),
  expires_at TIMESTAMP,
  attempts INT DEFAULT 0,
  created_at TIMESTAMP
);
```

---

## 🔐 Priority 0: Core Features (MVP)

### 1. Job Posting Form (Multi-Step)
**Location:** `/app/jobs/create/page.tsx`

```typescript
// Step 1: Basic Info
- Project Title
- Category (Dev, Design, Marketing, etc.)

// Step 2: Details
- Description
- Required Skills
- Budget Range
- Timeline

// Step 3: Contact
- Email
- Company Name
```

**API Endpoint:** `POST /api/jobs/create`

---

### 2. Freelancer Application Form
**Location:** `/app/apply/page.tsx`

```typescript
// Personal Info
- Name
- Email
- Portfolio URL

// Professional
- Skills
- Experience Level
- Hourly Rate

// Application
- Short Bio
- Referral Source
```

**API Endpoint:** `POST /api/freelancers/apply`

---

### 3. Escrow Payment Integration (Korapay Connect)

```typescript
// Dependencies to add
npm install korapay @korapay/react-korapay-js

// File: lib/korapay.ts
export const createPaymentIntent = async (projectId: string, amount: number) => {
  const korapay = new Korapay(process.env.STRIPE_SECRET_KEY!);
  const paymentIntent = await korapay.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    metadata: { projectId }
  });
  return paymentIntent;
};

// File: app/api/payments/create-intent/route.ts
export async function POST(req: NextRequest) {
  const { projectId, amount } = await req.json();
  const intent = await createPaymentIntent(projectId, amount);
  return NextResponse.json(intent);
}
```

---

### 4. Milestone Tracking Dashboard

**Location:** `/app/dashboard/milestones/page.tsx`

```typescript
Features:
- Visual progress bar (Step 1 ✅ → Step 2 🔄 → Step 3 ⏳)
- Milestone list with statuses
- File uploads per milestone
- Milestone approval workflow
- Automatic payment release on approval
```

---

## 🎯 Priority 1: Important Features

### 5. Verified Badge System

```typescript
// Badge Tiers
const BADGES = {
  0: { name: 'None', icon: '🔵', description: 'New freelancer' },
  1: { name: 'Portfolio Reviewed', icon: '🥉', description: 'Portfolio verified' },
  2: { name: 'Test Passed', icon: '🥈', description: 'Completed test project' },
  3: { name: 'ELACCESS Graduate', icon: '🥇', description: 'Trained by ELACCESS' }
};

// Implementation
File: components/VerifiedBadge.tsx
- Display badge with tooltip
- Show verification progress
- Link to verification page

File: app/verify/page.tsx
- Portfolio upload form
- Test project assignment
- Video verification option
```

---

### 6. Profile Pages

**Client Profile:** `/app/profiles/clients/[id]/page.tsx`
```
- Company info
- Hiring history
- Projects posted
- Client reviews
- Contact info
```

**Freelancer Profile:** `/app/profiles/freelancers/[id]/page.tsx`
```
- Portfolio showcase
- Skills & badges
- Hourly rate
- Availability
- Reviews & ratings
- GitHub/LinkedIn links
```

---

### 7. Review System (Double-Blind)

```typescript
// File: app/api/reviews/create/route.ts
Features:
- Both parties submit reviews independently
- Reviews hidden until both submitted
- 1-5 star rating
- Comment field
- Public/Private toggle
- No retaliation possible

Database Implementation:
reviews table with:
- reviewer_id
- reviewee_id
- project_id
- rating
- comment
- is_public
- both_submitted (boolean)
```

---

### 8. Instant Pay Feature

```typescript
// File: lib/payments.ts
export const enableInstantPay = async (freelancerId: string, amount: number) => {
  // Connect to Korapay account
  const korapay = new Korapay(process.env.STRIPE_SECRET_KEY!);
  
  // Create payout
  const payout = await korapay.payouts.create({
    amount: amount * 95 / 100, // 5% fee
    currency: 'usd',
    destination: freelancer.korapay_account_id
  });
  
  return payout;
};

// Fee Options
- Instant Pay: 5% fee (withdraw today)
- Standard Pay: 0% fee (withdraw in 3 days)
```

---

## 💡 Priority 2: Enhancement Features

### 9. Smart Matching Algorithm

```typescript
// File: lib/matching.ts
export const matchFreelancersToProject = (project: Project): Freelancer[] => {
  const freelancers = getAllFreelancers();
  
  return freelancers
    .map(freelancer => {
      let score = 0;
      
      // Skills match (weight: 40%)
      score += calculateSkillsMatch(project.skills, freelancer.skills) * 0.4;
      
      // Budget match (weight: 30%)
      score += calculateBudgetMatch(project.budget, freelancer.rates) * 0.3;
      
      // Availability (weight: 20%)
      score += calculateAvailability(freelancer.availability, project.timeline) * 0.2;
      
      // Rating (weight: 10%)
      score += (freelancer.avgRating / 5) * 0.1;
      
      return { freelancer, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.freelancer);
};
```

---

### 10. Daily Standups (Slack Integration)

```typescript
// File: lib/slack.ts
npm install @slack/bolt

export const setupSlackBot = () => {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
  });
  
  // Daily message at 9 AM
  app.event('app_mention', async ({ event, client }) => {
    await client.chat.postMessage({
      channel: event.channel,
      text: `Good morning! ${freelancer.name}\n\n` +
            `📋 What did you ship yesterday?\n` +
            `🎯 What's today's goal?\n` +
            `🚧 Any blockers?`
    });
  });
  
  return app;
};
```

---

### 11. Time Tracking

```typescript
// File: components/TimeTracker.tsx
Features:
- Start/Stop timer
- Manual time entry
- Optional screenshot capture
- Activity log
- Invoice generation

Database: time_logs table
- freelancer_id
- project_id
- start_time
- end_time
- duration
- screenshot_url
- notes
```

---

### 12. ELITES Learning Integration

```typescript
// File: lib/elites.ts
export const getFreelancerCourses = (freelancerId: string) => {
  // Query ELITES API
  const courses = fetchCoursesFromELITES(freelancer.skillGaps);
  
  // Display as suggestions
  return courses;
};

// Badge System
- Course Completed Badge (appears on profile)
- Skill Mastery Badge
- Learning Streak Badge
```

---

## 🚀 Implementation Priority

```
Week 1-2: Job Posting + Freelancer Application + Milestone Tracking
Week 3-4: Korapay Escrow Integration + Basic Review System
Week 5-6: Verified Badge System + Profile Pages
Week 7-8: Instant Pay + Smart Matching Algorithm
Week 9-10: Slack Integration + Time Tracking
Week 11-12: ELITES Learning + Advanced Features
```

---

## 📊 Database Migration Steps

1. **Set up Supabase project**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Run migrations**
   ```bash
   npx supabase migration new create_users_table
   ```

3. **Replace in-memory store**
   Update `/lib/users.ts` to use Supabase client

4. **Add Real-time listeners**
   ```typescript
   const client = createClient(URL, KEY);
   const subscription = client
     .from('projects')
     .on('*', payload => {
       console.log('New project:', payload);
     })
     .subscribe();
   ```

---

## 🔗 API Routes to Create

```
POST   /api/jobs/create
POST   /api/jobs/[id]/apply
GET    /api/jobs/[id]
GET    /api/jobs
GET    /api/freelancers/recommended
POST   /api/milestones/create
PATCH  /api/milestones/[id]/status
POST   /api/reviews/create
GET    /api/reviews/freelancer/[id]
POST   /api/payments/create-intent
POST   /api/payments/release-milestone
POST   /api/time-logs/start
POST   /api/time-logs/stop
GET    /api/dashboard/earnings
```

---

## ✅ Completion Checklist

- [ ] Database schema created in Supabase
- [ ] Job posting form built
- [ ] Freelancer application form built
- [ ] Korapay integration complete
- [ ] Milestone tracking MVP
- [ ] Verified badge system
- [ ] Profile pages
- [ ] Review system
- [ ] Instant pay
- [ ] Smart matching
- [ ] Slack integration
- [ ] Time tracking
- [ ] ELITES integration
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Security audit completed
- [ ] Launch ready

---

**Last Updated:** April 10, 2026
**Status:** Phase 2 Complete, Phase 3 In Progress
