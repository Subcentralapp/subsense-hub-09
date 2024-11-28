import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { initializeInvoicesTable } from './database/tableSetup';
import { setupInvoicesBucket, uploadInvoiceFile, deleteInvoiceFile } from './storage/invoiceStorage';

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
      
      await initializeInvoicesTable(supabase);

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
      
      await setupInvoicesBucket(supabase);
      const { fileName, publicUrl } = await uploadInvoiceFile(supabase, file);

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
      
      const invoice = get().invoices.find(inv => inv.id === id);
      if (!invoice) throw new Error('Facture non trouvée');

      await deleteInvoiceFile(supabase, invoice.url.split('/').pop() || '');

      const { error: dbError } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

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