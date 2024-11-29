import { supabase } from "@/lib/supabase";

export const updateInvoiceDetails = async (
  invoiceId: string,
  data: { amount: number; invoice_date: string }
) => {
  console.log('Updating invoice details for ID:', invoiceId);
  const { error } = await supabase
    .from('invoicedetails')  // Changed from 'InvoiceDetails' to 'invoicedetails'
    .update({
      amount: data.amount,
      invoice_date: data.invoice_date,
    })
    .eq('invoice_id', invoiceId);

  if (error) {
    console.error('Error updating invoice details:', error);
    throw error;
  }
};