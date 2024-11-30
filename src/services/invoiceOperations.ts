import { supabase } from "@/lib/supabase";

export const updateInvoiceDetails = async (
  invoiceId: string,
  data: { amount: number; invoice_date: string }
) => {
  console.log('Updating invoice details for ID:', invoiceId, 'with data:', data);
  
  // Vérifions d'abord si un enregistrement existe
  const { data: existing, error: checkError } = await supabase
    .from('invoicedetails')
    .select('*')
    .eq('invoice_id', invoiceId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking invoice details:', checkError);
    throw checkError;
  }

  if (!existing) {
    // Si aucun enregistrement n'existe, on en crée un nouveau
    const { error: insertError } = await supabase
      .from('invoicedetails')
      .insert([{
        invoice_id: invoiceId,
        amount: data.amount,
        invoice_date: data.invoice_date,
        status: 'pending'
      }]);

    if (insertError) {
      console.error('Error inserting invoice details:', insertError);
      throw insertError;
    }
  } else {
    // Si un enregistrement existe, on le met à jour
    const { error: updateError } = await supabase
      .from('invoicedetails')
      .update({
        amount: data.amount,
        invoice_date: data.invoice_date,
      })
      .eq('invoice_id', invoiceId);

    if (updateError) {
      console.error('Error updating invoice details:', updateError);
      throw updateError;
    }
  }

  console.log('Successfully updated invoice details');
};