export interface Invoice {
  id: string;
  name: string;
  date: Date;
  url: string;
  details?: {
    amount: number | null;
    category: string | null;
    invoice_date: string | null;
    merchant_name: string | null;
    status: string | null;
  };
}

export interface InvoiceDetails {
  amount: number | null;
  category: string | null;
  invoice_date: string | null;
  merchant_name: string | null;
  status: string | null;
}