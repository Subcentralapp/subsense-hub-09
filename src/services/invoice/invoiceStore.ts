import { create } from 'zustand';
import { InvoiceStore } from './types';
import { uploadInvoiceFile, deleteInvoiceFile } from '../storage/invoiceStorage';
import { fetchInvoicesFromDB, updateInvoiceDetailsInDB, deleteInvoiceFromDB } from './invoiceOperations';

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  isLoading: false,

  fetchInvoices: async () => {
    try {
      set({ isLoading: true });
      const invoicesWithDetails = await fetchInvoicesFromDB();
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
      await uploadInvoiceFile(file);
      await get().fetchInvoices();
    } catch (error) {
      console.error('Error in addInvoice:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateInvoiceDetails: async (invoiceId: string, details: any) => {
    try {
      set({ isLoading: true });
      await updateInvoiceDetailsInDB(invoiceId, details);
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
        const fileName = invoiceToDelete.url.split('/').pop();
        if (fileName) {
          await deleteInvoiceFile(fileName);
        }
        await deleteInvoiceFromDB(id);
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