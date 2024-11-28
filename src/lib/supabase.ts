import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qhidxbdxcymhuyquyqgk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWR4YmR4Y3ltaHV5cXV5cWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTUxOTUsImV4cCI6MjA0ODM3MTE5NX0.Z_NGQ7nZONZSEdflyn7xbequfpjlK3hxnkznfqt6Qgg'

export const supabase = createClient(supabaseUrl, supabaseKey)