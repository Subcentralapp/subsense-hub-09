import { supabase } from "@/integrations/supabase/client";

export const updateInvoiceDetails = async (
  invoiceId: string,
  data: { 
    amount: number; 
    invoice_date: string;
    status: string;
    merchant_name: string;
  }
) => {
  console.log('Updating invoice details for ID:', invoiceId, 'with data:', data);
  
  const { data: existing, error: checkError } = await supabase
    .from('invoicedetails')
    .select('*')
    .eq('invoice_id', parseInt(invoiceId))
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking invoice details:', checkError);
    throw checkError;
  }

  if (!existing) {
    const { error: insertError } = await supabase
      .from('invoicedetails')
      .insert({
        invoice_id: parseInt(invoiceId),
        amount: data.amount,
        invoice_date: data.invoice_date,
        status: data.status,
        merchant_name: data.merchant_name
      });

    if (insertError) {
      console.error('Error inserting invoice details:', insertError);
      throw insertError;
    }
  } else {
    const { error: updateError } = await supabase
      .from('invoicedetails')
      .insert({
        invoice_id: parseInt(invoiceId),
        amount: data.amount,
        invoice_date: data.invoice_date,
        status: data.status,
        merchant_name: data.merchant_name,
      });

    if (updateError) {
      console.error('Error updating invoice details:', updateError);
      throw updateError;
    }
  }

  console.log('Successfully updated invoice details');
};