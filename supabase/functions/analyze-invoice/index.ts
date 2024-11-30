import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { Vision } from 'https://esm.sh/@google-cloud/vision@4.0.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl, invoiceId } = await req.json();
    console.log('Processing invoice:', { fileUrl, invoiceId });

    // Initialize Vision client
    const vision = new Vision();

    // Get the image from the URL
    const [result] = await vision.documentTextDetection(fileUrl);
    const fullText = result.fullTextAnnotation.text;
    console.log('Extracted text:', fullText);

    // Extract metadata using basic pattern matching
    // This is a simple example - you might want to enhance this with more sophisticated parsing
    const amount = extractAmount(fullText);
    const date = extractDate(fullText);
    const merchantName = extractMerchantName(fullText);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store the extracted metadata
    const { data, error: insertError } = await supabaseClient
      .from('invoicedetails')
      .insert([{
        invoice_id: invoiceId,
        amount: amount,
        invoice_date: date,
        merchant_name: merchantName,
        status: 'pending',
        created_at: new Date().toISOString()
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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log('Successfully stored invoice metadata:', data);
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Helper functions to extract information from text
function extractAmount(text: string): number | null {
  const amountRegex = /(\d+[.,]\d{2})\s*(?:€|EUR)/i;
  const match = text.match(amountRegex);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }
  return null;
}

function extractDate(text: string): string | null {
  // This regex looks for common date formats
  const dateRegex = /(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/;
  const match = text.match(dateRegex);
  if (match) {
    const [_, day, month, year] = match;
    const fullYear = year.length === 2 ? '20' + year : year;
    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return null;
}

function extractMerchantName(text: string): string | null {
  // This is a simple implementation - you might want to enhance it
  const firstLine = text.split('\n')[0];
  return firstLine.trim() || null;
}