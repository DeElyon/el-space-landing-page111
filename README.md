# EL SPACE - Freelance Marketplace Platform

**Tagline:** *"Freelance Without the Friction."*

## 🚀 What is EL SPACE?

EL SPACE is a modern freelance marketplace platform that connects top-tier tech talent with forward-thinking businesses. It's part of the EL VERSE TECHNOLOGIES ecosystem and offers:

- **Vetted Talent:** Only top 5% of freelancers approved
- **Fair Pricing:** 3-5% fees vs. Upwork's 20%
- **Instant Pay:** Withdraw earnings same day (5% fee)
- **No Bidding Wars:** AI-powered smart matching
- **Escrow Protection:** Funds held securely during projects

---

## ⚡ Quick Start

### 1. Pre-requisites
- Node.js 18.17 or later
- pnpm (or npm)
- Gmail account with app password

### 2. Installation
```bash
# Clone and install
git clone <repo>
cd el-space-landing-page
pnpm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📋 Features

### ✅ Phase 1: Landing Page (Complete)
- Modern, high-converting landing page
- Split-screen hero (clients vs. freelancers)
- Interactive earnings calculator
- Pricing tables with toggle
- Multi-section marketing site
- Featured talent carousel
- Testimonials & trust elements
- Comprehensive FAQ

### ✅ Phase 2: Authentication (Complete)
- **OTP-based login** - Secure, frictionless
- **Email verification** - Nodemailer integration
- **User registration** - 2-step process
- **Session management** - 7-day session
- **Welcome emails** - Personalized onboarding
- **Dashboard** - Authenticated user area

### 🔄 Phase 3: Core Platform (In Progress)
- Job posting & matching
- Escrow payments
- Milestone tracking
- Verified badge system
- Review system
- Time tracking
- Earnings dashboard

---

## 🏗️ Project Structure

```
el-space-landing-page/
├── app/
│   ├── api/auth/              # Auth endpoints
│   ├── auth/                  # Auth pages (login, register)
│   ├── dashboard/             # Protected dashboard
│   ├── globals.css
│   └── page.tsx               # Landing page
├── components/
│   ├── sections/              # Page sections (Navbar, Hero, etc.)
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── constants.ts           # Brand colors, content
│   ├── otp.ts                 # OTP generation & verification
│   ├── email.ts               # Email templates & sending
│   └── utils.ts
├── public/                    # Images, icons
├── .env.local                 # Environment variables
├── tailwind.config.ts
├── tsconfig.json
├── PLATFORM_GUIDE.md          # Complete feature guide
├── DEVELOPMENT_ROADMAP.md     # MVP roadmap
├── TESTING_GUIDE.md           # Testing instructions
└── package.json
```

---

## 🔐 Authentication Flow

### Registration
```
User Input → Send OTP → Verify Email → Create Account → Welcome Email → Dashboard
```

### Login
```
Email Input → Send OTP → Verify → Set Session → Dashboard
```

**OTP Details:**
- Length: 6 digits
- Expiry: 15 minutes
- Max attempts: 5

---

## 📧 Email Configuration

### Setup Gmail with App Password
```env
EMAIL_USER=elcoderssoftwares12@gmail.com
EMAIL_PASSWORD=zblm wwyp eoic tzfa
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Email Templates
- **OTP Email** - 6-digit code with 15-minute timer
- **Welcome Email** - Personalized based on user type

---

## 🎨 Brand Identity

| Layer | Details |
|-------|---------|
| **Colors** | Deep Indigo (#1E1B4B), Cyan (#06B6D4), Amber (#F59E0B) |
| **Typography** | Inter/Geist sans-serif (modern) |
| **Tone** | Professional, trustworthy, community-focused |
| **Tagline** | "Freelance Without the Friction" |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16.2 | React framework, fast builds |
| **Styling** | Tailwind CSS 4.2 | Utility-first CSS |
| **Components** | shadcn/ui + Radix UI | Pre-built accessible components |
| **Icons** | Lucide React | Beautiful SVG icons |
| **Email** | Nodemailer | SMTP email sending |
| **Auth** | OTP | Secure, frictionless login |
| **Database** | Supabase (planned) | PostgreSQL + Realtime |
| **Payments** | Korapay (planned) | Payment processing & escrow |

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[PLATFORM_GUIDE.md](./PLATFORM_GUIDE.md)** | Complete platform features, routes, and configuration |
| **[DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)** | Database schema, MVP features, implementation roadmap |
| **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** | How to test OTP system, email templates, all flows |

---

## 🧪 Testing

### Quick Test: Registration
1. Go to [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
2. Enter email, name, user type
3. Click "Continue"
4. Check Gmail (Promotions tab) for OTP
5. Enter 6-digit code
6. See "Registration successful!" message
7. Check email for Welcome message
8. Dashboard loaded and authenticated

### Quick Test: Login
1. Go to [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Enter registered email
3. Click "Send OTP"
4. Check Gmail for OTP
5. Enter code and verify
6. Instant dashboard access

**Full testing guide:** See [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Environment Variables (Production)
```env
NEXT_PUBLIC_EMAIL_FROM=your-email@gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
OTP_EXPIRY=900
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

---

## 📊 Feature Roadmap

### MVP - Phase 1 (Complete) ✅
- [x] Landing page with all sections
- [x] OTP authentication
- [x] Email integration
- [x] User registration
- [x] Dashboard

### Phase 2 (In Progress) 🔄
- [ ] Job posting form
- [ ] Freelancer application
- [ ] Profile pages
- [ ] Review system
- [ ] Verified badges

### Phase 3 (Planned)
- [ ] Escrow payments (Korapay)
- [ ] Milestone tracking
- [ ] Instant pay
- [ ] Smart matching
- [ ] Time tracking
- [ ] Slack integration
- [ ] ELITES integration

See [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) for detailed roadmap.

---

## 🐛 Troubleshooting

### OTP Not Received?
1. Check **Promotions tab** in Gmail
2. Verify email address is correct
3. Check `.env.local` for correct credentials
4. Use 16-character app password, NOT regular password
5. Check terminal for error logs

### Build Error?
```bash
rm -rf .next node_modules
pnpm install
npm run build
```

### Dev Server Won't Start?
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Restart
npm run dev
```

---

## 📱 Pages & Routes

### Public Pages
| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/auth/login` | OTP login |
| `/auth/register` | User registration |

### Protected Pages
| Route | Purpose |
|-------|---------|
| `/dashboard` | User dashboard |
| `/dashboard/projects` | Projects (coming) |
| `/dashboard/profile` | Profile (coming) |
| `/dashboard/earnings` | Earnings (coming) |

### API Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/send-otp` | POST | Send OTP email |
| `/api/auth/verify-otp` | POST | Verify OTP |
| `/api/auth/register` | POST | Create user account |

---

## ✅ Launch Readiness Checklist

- [x] Landing page complete & responsive
- [x] OTP authentication working
- [x] Email integration tested
- [x] Welcome emails sent
- [x] Dashboard created
- [x] Build passes without errors
- [x] Documentation written
- [ ] Database connected
- [ ] Payment integration
- [ ] Security audit
- [ ] Performance optimized
- [ ] Analytics setup
- [ ] SEO configured
- [ ] 404 page designed

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Nodemailer Docs](https://nodemailer.com)
- [Supabase Docs](https://supabase.com/docs)
- [Korapay Connect](https://korapay.com/connect)

---

## 📞 Support & Contact

Questions about EL SPACE? Contact the EL VERSE TECHNOLOGIES team.

---

## 📝 License

© 2026 EL VERSE TECHNOLOGIES. All rights reserved.

---

**Status:** Phase 2 Complete (MVP Auth Ready) ✅  
**Version:** 1.0.0-beta  
**Last Updated:** April 10, 2026  
**Node Version:** 18.17+  
**Package Manager:** pnpm 10.23+

**Freelance Without Friction.** ✨
