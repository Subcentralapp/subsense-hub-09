import { create } from 'zustand';
import { uploadInvoiceFile, deleteInvoiceFile, fetchInvoices as fetchInvoicesFromStorage } from './storage/invoiceStorage';
import { supabase } from '@/lib/supabase';

interface Invoice {
  id: string;
  name: string;
  date: Date;
  url: string;
  details?: {
    amount: number;
    category: string;
    invoice_date: string;
    merchant_name: string;
    status: string;
  };
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
      const data = await fetchInvoicesFromStorage();
      
      // Fetch invoice details
      const invoicesWithDetails = await Promise.all(
        data.map(async (inv: any) => {
          const { data: details } = await supabase
            .from('InvoiceDetails')
            .select('*')
            .eq('invoice_id', inv.id)
            .single();
          
          return {
            id: inv.id,
            name: inv.Names,
            date: new Date(inv.created_at),
            url: inv.url,
            details: details || undefined
          };
        })
      );

      set({ invoices: invoicesWithDetails });
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addInvoice: async (file: File) => {
    try {
      set({ isLoading: true });
      const invoice = await uploadInvoiceFile(file);
      
      // Analyze the invoice with Google Vision API
      const { error: analysisError } = await supabase.functions.invoke('analyze-invoice', {
        body: { fileUrl: invoice.url, invoiceId: invoice.id }
      });

      if (analysisError) {
        console.error('Error analyzing invoice:', analysisError);
      }

      set((state) => ({
        invoices: [{
          id: invoice.id,
          name: invoice.Names,
          date: new Date(invoice.created_at),
          url: invoice.url
        }, ...state.invoices]
      }));

      // Refresh to get the analyzed details
      await get().fetchInvoices();
    } catch (error) {
      console.error('Error adding invoice:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeInvoice: async (id: string) => {
    try {
      set({ isLoading: true });
      const invoiceToDelete = get().invoices.find((inv) => inv.id === id);
      
      if (invoiceToDelete) {
        await deleteInvoiceFile(invoiceToDelete.url.split('/').pop() || '');
        set((state) => ({
          invoices: state.invoices.filter((inv) => inv.id !== id)
        }));
      }
    } catch (error) {
      console.error('Error removing invoice:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));