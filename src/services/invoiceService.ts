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
      
      // Vérifier si la table existe
      const { error: tableError } = await supabase
        .from('invoices')
        .select('count')
        .limit(1)
        .single();

      // Si la table n'existe pas, on retourne un tableau vide
      if (tableError?.message?.includes('does not exist')) {
        console.log('La table invoices n\'existe pas encore');
        set({ invoices: [] });
        return;
      }

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

      // Vérifier si la table existe et la créer si nécessaire
      const { error: tableError } = await supabase
        .from('invoices')
        .select('count')
        .limit(1)
        .single();

      if (tableError?.message?.includes('does not exist')) {
        console.log('Création de la table invoices...');
        const { error: createError } = await supabase.rpc('create_invoices_table');
        if (createError) throw createError;
      }

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