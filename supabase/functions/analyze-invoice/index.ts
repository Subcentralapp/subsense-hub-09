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
    console.log('Starting invoice analysis for:', { fileUrl, invoiceId });

    // Fetch the PDF file
    const pdfResponse = await fetch(fileUrl);
    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }

    // Convert PDF to base64
    const pdfBuffer = await pdfResponse.arrayBuffer();
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
    console.log('PDF converted to base64');

    // Call Google Vision API
    const visionApiKey = Deno.env.get('Google Vision');
    if (!visionApiKey) {
      throw new Error('Google Vision API key not found');
    }

    const visionRequest = {
      requests: [{
        image: { content: base64Content },
        features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
        imageContext: {
          languageHints: ['fr']
        }
      }]
    };

    console.log('Calling Google Vision API...');
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visionRequest)
      }
    );

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text();
      console.error('Vision API error:', errorText);
      throw new Error(`Vision API error: ${errorText}`);
    }

    const visionResult = await visionResponse.json();
    const extractedText = visionResult.responses[0]?.fullTextAnnotation?.text;
    if (!extractedText) {
      throw new Error('No text extracted from document');
    }

    console.log('Extracted text:', extractedText);

    // Extract invoice details
    const amount = extractAmount(extractedText);
    const date = extractDate(extractedText);
    const merchantName = extractMerchantName(extractedText);

    console.log('Extracted metadata:', { amount, date, merchantName });

    // Store results in Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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
      console.error('Error storing invoice details:', insertError);
      throw insertError;
    }

    console.log('Successfully stored invoice details:', data);
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
    if (trimmed && trimmed.length > 2) {
      return trimmed;
    }
  }
  return null;
}