import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
const isConfigured = supabaseUrl && supabaseKey && 
                     !supabaseUrl.includes('placeholder') && 
                     !supabaseKey.includes('placeholder');

export const createClient = () => {
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
        signInWithOtp: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
      rpc: () => Promise.resolve({ data: null, error: null }),
    };
    return mockClient as any;
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};
