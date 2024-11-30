import { create } from 'zustand';
import { uploadInvoiceFile, deleteInvoiceFile } from './storage/invoiceStorage';
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
  updateInvoiceDetails: (invoiceId: string, details: Partial<Invoice['details']>) => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  isLoading: false,

  fetchInvoices: async () => {
    try {
      set({ isLoading: true });
      const { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const invoicesWithDetails = await Promise.all(
        invoices.map(async (inv) => {
          const { data: details } = await supabase
            .from('invoicedetails')
            .select('*')
            .eq('invoice_id', inv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
          
          return {
            id: inv.id,
            name: inv.names || inv.Names,
            date: new Date(inv.created_at),
            url: inv.url,
            details: details || undefined
          };
        })
      );

      set({ invoices: invoicesWithDetails });
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addInvoice: async (file: File) => {
    try {
      set({ isLoading: true });
      const invoice = await uploadInvoiceFile(file);
      await get().fetchInvoices();
    } catch (error) {
      console.error('Error in addInvoice:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateInvoiceDetails: async (invoiceId: string, details: Partial<Invoice['details']>) => {
    try {
      set({ isLoading: true });
      
      const { error } = await supabase
        .from('invoicedetails')
        .insert({
          invoice_id: invoiceId,
          amount: details.amount,
          invoice_date: details.invoice_date,
          merchant_name: details.merchant_name,
          status: details.status,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      await get().fetchInvoices();
    } catch (error) {
      console.error('Error updating invoice details:', error);
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
        await supabase
          .from('invoicedetails')
          .delete()
          .eq('invoice_id', id);

        const fileName = invoiceToDelete.url.split('/').pop();
        if (fileName) {
          await deleteInvoiceFile(fileName);
        }

        await supabase
          .from('invoices')
          .delete()
          .eq('id', id);

        set((state) => ({
          invoices: state.invoices.filter((inv) => inv.id !== id)
        }));
      }
    } catch (error) {
      console.error('Error removing invoice:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));