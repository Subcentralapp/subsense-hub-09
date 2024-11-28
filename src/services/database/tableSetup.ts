import { SupabaseClient } from '@supabase/supabase-js';

export const initializeInvoicesTable = async (supabase: SupabaseClient) => {
  console.log('Initialisation de la table invoices...');
  
  const sql = `
    CREATE TABLE IF NOT EXISTS public.invoices (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );
    
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'invoices' AND policyname = 'Enable read access for all users'
      ) THEN
        ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable read access for all users" ON public.invoices FOR SELECT USING (true);
      END IF;
      
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'invoices' AND policyname = 'Enable insert access for all users'
      ) THEN
        CREATE POLICY "Enable insert access for all users" ON public.invoices FOR INSERT WITH CHECK (true);
      END IF;
      
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'invoices' AND policyname = 'Enable delete access for all users'
      ) THEN
        CREATE POLICY "Enable delete access for all users" ON public.invoices FOR DELETE USING (true);
      END IF;
    END $$;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql });
  
  if (error) {
    console.error('Erreur lors de l\'initialisation de la table:', error);
    throw error;
  }
};