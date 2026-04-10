# Vercel Deployment Guide

## 🔧 Setting Up Environment Variables on Vercel

The application will now run even without Supabase configured (using mock clients), but to enable full functionality, you need to configure environment variables on Vercel.

### Step 1: Get Your Supabase Credentials

1. Go to your Supabase project: https://supabase.com/dashboard/project/klhkzxdcdstcnqvihfcs
2. Navigate to **Project Settings** → **API**
3. Copy these values:
   - **Project URL**: `https://klhkzxdcdstcnqvihfcs.supabase.co`
   - **anon/public key**: Found in the API keys section

### Step 2: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

#### Required Variables (for Supabase integration)

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://klhkzxdcdstcnqvihfcs.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` (your actual key) | Supabase anon/public key |

#### Optional Variables (for full functionality)

| Variable | Value | Description |
|----------|-------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | ⚠️ Server-only key (never expose to client) |
| `EMAIL_HOST` | `smtp.gmail.com` | SMTP server hostname |
| `EMAIL_PORT` | `587` | SMTP port |
| `EMAIL_USER` | Your Gmail | SMTP username |
| `EMAIL_PASSWORD` | Your Gmail App Password | Gmail App Password |
| `NEXT_PUBLIC_EMAIL_FROM` | Your email | From address for outgoing emails |
| `OTP_EXPIRY` | `900` | OTP expiration in seconds (15 min) |
| `OTP_LENGTH` | `6` | Number of digits in OTP |
| `JWT_SECRET` | Your secret key | Secret key for JWT tokens |
| `KORAPAY_PUBLIC_KEY` | Your Korapay public key | Korapay payment gateway |
| `KORAPAY_SECRET_KEY` | Your Korapay secret key | ⚠️ Server-only key |
| `NEXT_PUBLIC_APP_URL` | Your app URL | Base URL of your application |
| `NEXT_PUBLIC_APP_NAME` | `EL SPACE` | Display name of your application |

### Step 3: Redeploy

After adding the environment variables, you need to redeploy your application:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** (or push a new commit to trigger a new deployment)

### Step 4: Verify

1. Check the deployment logs for any errors
2. Visit your application and verify that:
   - The homepage loads without 500 errors
   - Authentication features work (if Supabase is configured)
   - Database operations succeed (if Supabase is configured)

---

## 🚀 Quick Setup Using Vercel CLI

Alternatively, you can use the Vercel CLI to set up environment variables:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull existing environment variables
vercel env pull

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy with new environment variables
vercel --prod
```

---

## 🔒 Security Notes

### Environment Variable Scopes

When adding environment variables in Vercel, make sure to set the correct scopes:

- **`NEXT_PUBLIC_*`** variables: Enable for **Development**, **Preview**, and **Production**
- **Server-only variables** (like `SUPABASE_SERVICE_ROLE_KEY`, `KORAPAY_SECRET_KEY`): Enable for **Development**, **Preview**, and **Production**, but they will only be available server-side

### Never Expose These Keys to the Client

The following should **never** be prefixed with `NEXT_PUBLIC_`:
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `KORAPAY_SECRET_KEY`
- `JWT_SECRET`
- `EMAIL_PASSWORD`

---

## 🐛 Troubleshooting

### Still Getting 500 Errors?

1. **Check Environment Variables**: Make sure all required variables are set in Vercel
2. **Redeploy**: Environment changes require a redeployment to take effect
3. **Check Logs**: Look at Vercel deployment logs for specific error messages

### Supabase Connection Fails?

1. Verify your Supabase project is active
2. Double-check the URL and anon key are correct
3. Ensure database tables exist in your Supabase instance
4. Check Row Level Security (RLS) policies

### Email/OTP Not Working?

1. Verify Gmail App Password is correct (no spaces)
2. Ensure 2-Step Verification is enabled on Gmail
3. Check SMTP settings are correct

---

## ✅ Current Status

The application has been updated to handle missing Supabase configuration gracefully:
- ✅ Mock clients are used when environment variables are missing
- ✅ No more 500 errors on page load
- ⚠️ Database operations will return null data until Supabase is configured
- ⚠️ Authentication features won't work until Supabase is configured

To enable full functionality, configure the Supabase environment variables following this guide.
