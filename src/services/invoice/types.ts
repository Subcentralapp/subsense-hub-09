import { Invoice, InvoiceDetails } from '@/types/invoice';

export interface InvoiceStore {
  invoices: Invoice[];
  isLoading: boolean;
  addInvoice: (file: File) => Promise<void>;
  removeInvoice: (id: string) => Promise<void>;
  fetchInvoices: () => Promise<void>;
  updateInvoiceDetails: (invoiceId: string, details: Partial<InvoiceDetails>) => Promise<void>;
}