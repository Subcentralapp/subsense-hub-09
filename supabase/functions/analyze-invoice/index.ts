import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

console.log("Analyze Invoice function started");

serve(async (req) => {
  try {
    const { fileUrl, invoiceId } = await req.json();
    console.log('Processing invoice:', { fileUrl, invoiceId });

    if (!fileUrl || !invoiceId) {
      console.error('Missing required parameters');
      return new Response(
        JSON.stringify({ error: 'Missing fileUrl or invoiceId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify that the invoice exists
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('invoices')
      .select('id')
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoice) {
      console.error('Invoice not found:', invoiceError);
      return new Response(
        JSON.stringify({ 
          error: 'Invoice not found',
          details: invoiceError 
        }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Pour l'instant, on stocke des métadonnées basiques
    // TODO: Implémenter l'analyse OCR plus tard
    const { data, error: insertError } = await supabaseClient
      .from('invoicedetails')
      .insert([{
        invoice_id: invoiceId,
        amount: 0,
        invoice_date: new Date().toISOString(),
        status: 'pending',
        created_at: new Date().toISOString(),
        merchant_name: 'À déterminer'
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Error storing metadata:', insertError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to store invoice metadata',
          details: insertError 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Successfully stored invoice metadata:', data);
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});