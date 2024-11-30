import { create } from 'zustand';
import { uploadInvoiceFile, deleteInvoiceFile, fetchInvoicesFromStorage } from './storage/invoiceStorage';
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
      const data = await fetchInvoicesFromStorage();
      
      const invoicesWithDetails = await Promise.all(
        data.map(async (inv: any) => {
          const { data: details } = await supabase
            .from('invoicedetails')
            .select('*')
            .eq('invoice_id', inv.id)
            .order('created_at', { ascending: false })
            .limit(1);
          
          return {
            id: inv.id,
            name: inv.Names || inv.names,
            date: new Date(inv.created_at),
            url: inv.url,
            details: details?.[0] || undefined
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
      console.log('Starting invoice upload process...');
      
      const invoice = await uploadInvoiceFile(file);
      console.log('File uploaded and invoice created:', invoice);

      if (!invoice || !invoice.id) {
        throw new Error('Failed to create invoice record');
      }

      const { error: detailsError } = await supabase
        .from('invoicedetails')
        .insert({
          invoice_id: invoice.id,
          status: 'pending',
          created_at: new Date().toISOString()
        });

      if (detailsError) {
        console.error('Error creating invoice details:', detailsError);
        await supabase.from('invoices').delete().eq('id', invoice.id);
        throw detailsError;
      }
      
      console.log('Invoice details created successfully');

      set((state) => ({
        invoices: [{
          id: invoice.id,
          name: invoice.Names || invoice.names,
          date: new Date(invoice.created_at),
          url: invoice.url,
          details: {
            status: 'pending',
            amount: 0,
            category: '',
            invoice_date: new Date().toISOString(),
            merchant_name: ''
          }
        }, ...state.invoices]
      }));

    } catch (error) {
      console.error('Error in addInvoice:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateInvoiceDetails: async (invoiceId: string, details: Partial<Invoice['details']>) => {
    try {
      set({ isLoading: true });
      console.log('Updating invoice details:', { invoiceId, details });
      
      const { error } = await supabase
        .from('invoicedetails')
        .insert({
          invoice_id: invoiceId,
          ...details,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating invoice details:', error);
        throw error;
      }

      console.log('Invoice details updated successfully');
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
      console.log('Starting invoice deletion process for ID:', id);

      const invoiceToDelete = get().invoices.find((inv) => inv.id === id);
      
      if (invoiceToDelete) {
        const { error: detailsError } = await supabase
          .from('invoicedetails')
          .delete()
          .eq('invoice_id', id);

        if (detailsError) {
          console.error('Error deleting invoice details:', detailsError);
          throw detailsError;
        }

        console.log('Invoice details deleted successfully');

        const fileName = invoiceToDelete.url.split('/').pop();
        if (fileName) {
          await deleteInvoiceFile(fileName);
        }

        console.log('Invoice deleted successfully');

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