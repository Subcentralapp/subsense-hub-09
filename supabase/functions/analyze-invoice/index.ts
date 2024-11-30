import { corsHeaders } from './cors.ts';
import { analyzeImageWithVision } from './vision.ts';
import { extractAmount, extractDate, extractMerchantName } from './extractors.ts';
import { updateInvoiceDetails } from './database.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl, invoiceId } = await req.json();
    console.log('Starting invoice analysis for:', { fileUrl, invoiceId });

    if (!fileUrl || !invoiceId) {
      throw new Error('Missing required parameters: fileUrl or invoiceId');
    }

    // Fetch the PDF file
    const pdfResponse = await fetch(fileUrl);
    if (!pdfResponse.ok) {
      console.error('Failed to fetch PDF:', pdfResponse.statusText);
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }

    // Convert PDF to base64
    const pdfBuffer = await pdfResponse.arrayBuffer();
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
    console.log('PDF converted to base64');

    // Analyze with Google Vision
    const visionResult = await analyzeImageWithVision(base64Content);
    console.log('Vision API response received');

    const extractedText = visionResult.responses[0]?.fullTextAnnotation?.text || '';
    console.log('Extracted text:', extractedText);

    // Extract metadata
    const amount = extractAmount(extractedText);
    const date = extractDate(extractedText);
    const merchantName = extractMerchantName(extractedText);

    console.log('Extracted metadata:', { amount, date, merchantName });

    // Update database
    await updateInvoiceDetails(invoiceId, {
      amount,
      invoice_date: date,
      merchant_name: merchantName
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { amount, date, merchantName } 
      }),
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
        error: error.message,
        details: 'An error occurred while processing the invoice.'
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