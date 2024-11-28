import { create } from 'zustand';

interface Invoice {
  id: string;
  name: string;
  date: Date;
  file: File;
}

interface InvoiceStore {
  invoices: Invoice[];
  addInvoice: (file: File) => void;
  removeInvoice: (id: string) => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  addInvoice: (file: File) => {
    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      name: file.name,
      date: new Date(),
      file: file,
    };
    set((state) => ({
      invoices: [...state.invoices, newInvoice],
    }));
    console.log('Invoice added:', newInvoice);
  },
  removeInvoice: (id: string) => {
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    }));
    console.log('Invoice removed:', id);
  },
}));