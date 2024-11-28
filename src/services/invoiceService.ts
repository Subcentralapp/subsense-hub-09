import { create } from 'zustand';
import { uploadInvoiceFile, deleteInvoiceFile, fetchInvoices as fetchInvoicesFromStorage } from './storage/invoiceStorage';

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
      const data = await fetchInvoicesFromStorage();
      
      set({
        invoices: data.map((inv: any) => ({
          id: inv.id,
          name: inv.Names,
          date: new Date(inv.created_at),
          url: inv.url
        }))
      });
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
      
      set((state) => ({
        invoices: [{
          id: invoice.id,
          name: invoice.Names,
          date: new Date(invoice.created_at),
          url: invoice.url
        }, ...state.invoices]
      }));
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