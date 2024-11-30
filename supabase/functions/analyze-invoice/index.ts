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

    // Convert PDF to base64
    const pdfResponse = await fetch(fileUrl);
    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
    console.log('PDF converted to base64');

    // Prepare the request to Google Cloud Vision API
    const visionRequest = {
      requests: [{
        image: {
          content: base64Content
        },
        features: [{
          type: "DOCUMENT_TEXT_DETECTION",
          maxResults: 1
        }],
        imageContext: {
          languageHints: ["fr-t-i0-handwrit"]
        }
      }]
    };

    console.log('Sending request to Vision API...');
    
    // Call Google Cloud Vision API
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate`;
    const visionApiKey = Deno.env.get('GOOGLE_VISION_API_KEY');
    
    if (!visionApiKey) {
      throw new Error('Google Vision API key not configured');
    }

    const response = await fetch(`${visionApiUrl}?key=${visionApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visionRequest)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vision API error:', errorText);
      throw new Error(`Vision API error: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Vision API response received');

    const fullText = result.responses[0]?.fullTextAnnotation?.text;
    if (!fullText) {
      console.error('No text extracted from document');
      throw new Error('No text could be extracted from the document');
    }

    console.log('Extracted text:', fullText);

    // Extract metadata using pattern matching
    const amount = extractAmount(fullText);
    const date = extractDate(fullText);
    const merchantName = extractMerchantName(fullText);

    console.log('Extracted metadata:', { amount, date, merchantName });

    // Initialize Supabase client
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
    console.error('Error processing invoice:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

function extractAmount(text: string): number | null {
  // Look for amounts in format: XX,XX € or XX.XX € or XX€
  const amountRegex = /(\d+(?:[.,]\d{2})?)\s*(?:€|EUR)/i;
  const match = text.match(amountRegex);
  if (match) {
    // Convert amount string to number, handling both . and , as decimal separator
    const amount = match[1].replace(',', '.');
    return parseFloat(amount);
  }
  return null;
}

function extractDate(text: string): string | null {
  // Look for dates in format: DD/MM/YYYY or DD-MM-YYYY
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
  // Get the first line of text as merchant name
  const lines = text.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && trimmed.length > 2) { // Avoid single characters or empty lines
      return trimmed;
    }
  }
  return null;
}