import { supabase } from "@/integrations/supabase/client";
import { Invoice } from "@/types/invoice";

export const fetchInvoicesFromDB = async () => {
  console.log("Fetching invoices...");
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const invoicesWithDetails = await Promise.all(
    (invoices || []).map(async (inv) => {
      const { data: details } = await supabase
        .from('invoicedetails')
        .select('*')
        .eq('invoice_id', inv.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      return {
        id: inv.id.toString(),
        name: inv.names || '',
        date: new Date(inv.created_at || Date.now()),
        url: inv.url || '',
        details: details || undefined
      };
    })
  );

  return invoicesWithDetails;
};

export const updateInvoiceDetailsInDB = async (invoiceId: string, details: any) => {
  console.log('Updating invoice details:', { invoiceId, details });
  
  const { error } = await supabase
    .from('invoicedetails')
    .insert({
      invoice_id: parseInt(invoiceId),
      amount: details.amount,
      invoice_date: details.invoice_date,
      status: details.status,
      merchant_name: details.merchant_name,
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error in updateInvoiceDetails:', error);
    throw error;
  }
};

export const deleteInvoiceFromDB = async (id: string) => {
  await supabase
    .from('invoicedetails')
    .delete()
    .eq('invoice_id', parseInt(id));

  await supabase
    .from('invoices')
    .delete()
    .eq('id', parseInt(id));
};