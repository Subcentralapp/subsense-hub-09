import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl, invoiceId } = await req.json();
    console.log('Processing invoice:', { fileUrl, invoiceId });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // First verify that the invoice exists
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('invoices')
      .select('id')
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoice) {
      console.error('Invoice not found:', invoiceError);
      return new Response(
        JSON.stringify({ 
          error: 'Invoice not found' 
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 404
        }
      );
    }

    // For now, just store basic metadata since we're troubleshooting
    const { data, error: insertError } = await supabaseClient
      .from('invoicedetails')
      .insert([{
        invoice_id: invoiceId,
        amount: 0, // Default amount
        invoice_date: new Date().toISOString(),
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select();

    if (insertError) {
      console.error('Error storing metadata:', insertError);
      return new Response(
        JSON.stringify({ 
          error: insertError.message 
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 500
        }
      );
    }

    console.log('Successfully stored metadata:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error processing invoice:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while processing the invoice'
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }
});