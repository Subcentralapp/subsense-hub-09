import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://qhidxbdxcymhuyquyqgk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWR4YmR4Y3ltaHV5cXV5cWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTUxOTUsImV4cCI6MjA0ODM3MTE5NX0.Z_NGQ7nZONZSEdflyn7xbequfpjlK3hxnkznfqt6Qgg',
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      autoRefreshToken: true,
      storage: localStorage,
      storageKey: 'supabase.auth.token',
      flowType: 'pkce'
    },
    global: {
      headers: {
        'X-Client-Info': `subacentral@${window.location.hostname}`,
      },
    },
  }
)

// Add logging for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, 'Session:', session ? 'exists' : 'null');
});

// Add error handling for auth events
supabase.auth.onError((error) => {
  console.error('Auth error:', error);
  if (error.message.includes('JWT')) {
    console.log('JWT error detected, clearing local storage');
    localStorage.clear();
    window.location.href = '/landing';
  }
});