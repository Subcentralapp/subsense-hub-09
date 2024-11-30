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
      
      const invoicesWithDetails = await Promise.all(
        data.map(async (inv: any) => {
          // Create invoice details if they don't exist
          const { data: details, error: detailsError } = await supabase
            .from('invoicedetails')
            .select('*')
            .eq('invoice_id', inv.id)
            .single();

          if (detailsError && detailsError.code === 'PGRST116') {
            console.log('Creating missing invoice details for invoice:', inv.id);
            const { data: newDetails, error: insertError } = await supabase
              .from('invoicedetails')
              .insert([{
                invoice_id: inv.id,
                status: 'pending',
                created_at: new Date().toISOString()
              }])
              .select()
              .single();

            if (insertError) {
              console.error('Error creating invoice details:', insertError);
              throw insertError;
            }

            return {
              id: inv.id,
              name: inv.Names,
              date: new Date(inv.created_at),
              url: inv.url,
              details: newDetails
            };
          }
          
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
      console.log('Starting invoice upload process...');
      
      // Upload the file first
      const invoice = await uploadInvoiceFile(file);
      console.log('File uploaded successfully:', invoice);

      // Create initial invoice details
      const { error: detailsError } = await supabase
        .from('invoicedetails')
        .insert([{
          invoice_id: invoice.id,
          status: 'pending',
          created_at: new Date().toISOString()
        }]);

      if (detailsError) {
        console.error('Error creating initial invoice details:', detailsError);
        throw detailsError;
      }
      
      // Trigger the analysis
      console.log('Triggering invoice analysis...');
      const { error: analysisError } = await supabase.functions.invoke('analyze-invoice', {
        body: { fileUrl: invoice.url, invoiceId: invoice.id }
      });

      if (analysisError) {
        console.error('Error analyzing invoice:', analysisError);
        throw analysisError;
      }

      console.log('Invoice analysis completed successfully');

      // Add the new invoice to the state
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
      console.error('Error in addInvoice:', error);
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
        // Delete invoice details first
        const { error: detailsError } = await supabase
          .from('invoicedetails')
          .delete()
          .eq('invoice_id', id);

        if (detailsError) {
          console.error('Error deleting invoice details:', detailsError);
          throw detailsError;
        }

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