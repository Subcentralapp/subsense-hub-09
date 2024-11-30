import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

export async function updateInvoiceDetails(invoiceId: string, data: {
  amount: number | null;
  invoice_date: string | null;
  merchant_name: string | null;
}) {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // First, verify if the invoice exists
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('id')
    .eq('id', invoiceId)
    .single();

  if (invoiceError || !invoice) {
    console.error('Invoice not found:', invoiceError);
    throw new Error('Invoice not found in database');
  }

  // Update invoice details
  const { error: updateError } = await supabase
    .from('invoicedetails')
    .upsert({
      invoice_id: invoiceId,
      amount: data.amount,
      invoice_date: data.invoice_date,
      merchant_name: data.merchant_name,
      status: 'processed'
    });

  if (updateError) {
    console.error('Error updating invoice details:', updateError);
    throw updateError;
  }

  console.log('Invoice details updated successfully');
}