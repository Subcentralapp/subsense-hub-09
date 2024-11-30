import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

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

    // Prepare the request to Google Cloud Vision API
    const visionRequest = {
      requests: [{
        image: {
          source: {
            imageUri: fileUrl
          }
        },
        features: [{
          type: "DOCUMENT_TEXT_DETECTION"
        }]
      }]
    };

    // Call Google Cloud Vision API
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${Deno.env.get('GOOGLE_VISION_API_KEY')}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visionRequest)
      }
    );

    if (!response.ok) {
      throw new Error(`Vision API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Vision API response received');

    const fullText = result.responses[0]?.fullTextAnnotation?.text || '';
    console.log('Extracted text:', fullText);

    // Extract metadata using pattern matching
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
      throw insertError;
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
  const firstLine = text.split('\n')[0];
  return firstLine.trim() || null;
}