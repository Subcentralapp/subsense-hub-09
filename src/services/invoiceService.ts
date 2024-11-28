import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface Invoice {
  id: string;
  name: string;
  date: Date;
  url: string;
}

interface InvoiceStore {
  invoices: Invoice[];
  isLoading: boolean;
  addInvoice: (file: File) => Promise<void>;
  removeInvoice: (id: string) => Promise<void>;
  fetchInvoices: () => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  isLoading: false,

  fetchInvoices: async () => {
    try {
      set({ isLoading: true });
      console.log('Initialisation de la table invoices...');
      
      // Création de la table avec SQL brut
      const { error: createError } = await supabase.from('_sql').select('*').execute(`
        CREATE TABLE IF NOT EXISTS public.invoices (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          file_path TEXT NOT NULL,
          url TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
        );
        
        DO $$ 
        BEGIN
          -- Création des politiques RLS si elles n'existent pas déjà
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
      `);

      if (createError) {
        console.error('Erreur lors de l\'initialisation de la table:', createError);
        throw createError;
      }

      console.log('Récupération des factures...');
      const { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des factures:', error);
        throw error;
      }

      console.log('Factures récupérées:', invoices);
      
      set({ 
        invoices: invoices?.map(inv => ({
          ...inv,
          date: new Date(inv.created_at)
        })) || []
      });
    } catch (error) {
      console.error('Erreur lors du chargement des factures:', error);
      set({ invoices: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  addInvoice: async (file: File) => {
    try {
      set({ isLoading: true });
      
      // Vérifier si le bucket existe
      const { data: buckets } = await supabase
        .storage
        .listBuckets();

      const invoicesBucket = buckets?.find(b => b.name === 'invoices');
      
      if (!invoicesBucket) {
        console.log('Création du bucket invoices...');
        const { error: bucketError } = await supabase
          .storage
          .createBucket('invoices', { public: true });

        if (bucketError) throw bucketError;
      }
      
      // Upload du fichier dans le bucket 'invoices'
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Création de l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('invoices')
        .getPublicUrl(fileName);

      // Ajout de l'enregistrement dans la table invoices
      const { data: invoice, error: dbError } = await supabase
        .from('invoices')
        .insert([
          {
            name: file.name,
            file_path: fileName,
            url: publicUrl,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      console.log('Facture ajoutée avec succès:', invoice);

      // Mise à jour du state
      const { invoices } = get();
      set({
        invoices: [
          {
            id: invoice.id,
            name: invoice.name,
            date: new Date(invoice.created_at),
            url: invoice.url
          },
          ...invoices
        ]
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la facture:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeInvoice: async (id: string) => {
    try {
      set({ isLoading: true });
      
      // Récupération du chemin du fichier
      const invoice = get().invoices.find(inv => inv.id === id);
      if (!invoice) throw new Error('Facture non trouvée');

      // Suppression du fichier dans le storage
      const { error: storageError } = await supabase.storage
        .from('invoices')
        .remove([invoice.url.split('/').pop() || '']);

      if (storageError) throw storageError;

      // Suppression de l'enregistrement dans la base
      const { error: dbError } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // Mise à jour du state
      const { invoices } = get();
      set({
        invoices: invoices.filter(inv => inv.id !== id)
      });

      console.log('Facture supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la facture:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));