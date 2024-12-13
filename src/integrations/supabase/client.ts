import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://qhidxbdxcymhuyquyqgk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWR4YmR4Y3ltaHV5cXV5cWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTk1MzAsImV4cCI6MjAyNTIzNTUzMH0.qDjvLxBHm_JQVN--7smYTHKvx-vHCWkYqXY0Dh-ebQs',
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      autoRefreshToken: true,
      flowType: 'pkce',
      storage: window?.localStorage,
      storageKey: 'supabase.auth.token',
    },
    global: {
      headers: {
        'X-Client-Info': `subcentral@${window.location.hostname}`,
      },
    },
  }
)