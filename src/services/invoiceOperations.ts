import { supabase } from "@/lib/supabase";

export const updateInvoiceDetails = async (
  invoiceId: string,
  data: { amount: number; invoice_date: string }
) => {
  console.log('Updating invoice details for ID:', invoiceId, 'with data:', data);
  
  const { error } = await supabase
    .from('invoicedetails')
    .update({
      amount: data.amount,
      invoice_date: data.invoice_date,
    })
    .eq('invoice_id', invoiceId);

  if (error) {
    console.error('Error updating invoice details:', error);
    throw error;
  }

  console.log('Successfully updated invoice details');
};