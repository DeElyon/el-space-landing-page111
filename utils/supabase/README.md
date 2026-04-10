# Supabase Client Helpers

This directory contains Supabase client configurations for different environments.

## Files

- `server.ts` - Server-side Supabase client for Next.js Server Components
- `client.ts` - Browser-side Supabase client for Client Components
- `middleware.ts` - Middleware helper for session management (located in root directory)

## Usage

### Server Components

```typescript
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { data: todos } = await supabase.from('todos').select()
  
  return <ul>...</ul>
}
```

### Client Components

```typescript
import { createClient } from '@/utils/supabase/client'

export default function Page() {
  const supabase = createClient()
  
  const { data: todos } = await supabase.from('todos').select()
  
  return <ul>...</ul>
}
```
