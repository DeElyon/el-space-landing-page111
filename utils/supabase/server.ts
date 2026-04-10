import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
const isConfigured = supabaseUrl && supabaseKey && 
                     !supabaseUrl.includes('placeholder') && 
                     !supabaseKey.includes('placeholder');

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  // If not configured, return a mock client that won't throw errors
  if (!isConfigured) {
    console.warn('⚠️ Supabase not configured. Using mock client.');
    const mockClient = {
      from: () => ({
        select: () => Promise.resolve({ data: null, error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
        eq: function() { return this; },
        single: () => Promise.resolve({ data: null, error: null }),
        order: function() { return this; },
        limit: function() { return this; },
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
      rpc: () => Promise.resolve({ data: null, error: null }),
    };
    return mockClient as any;
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
