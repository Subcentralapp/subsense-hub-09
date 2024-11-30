import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fileUrl, invoiceId } = await req.json()
    console.log('Starting invoice analysis for:', { fileUrl, invoiceId })

    if (!fileUrl || !invoiceId) {
      throw new Error('Missing required parameters: fileUrl or invoiceId')
    }

    // Fetch the PDF file
    const pdfResponse = await fetch(fileUrl)
    if (!pdfResponse.ok) {
      console.error('Failed to fetch PDF:', pdfResponse.statusText)
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`)
    }

    // Convert PDF to base64
    const pdfBuffer = await pdfResponse.arrayBuffer()
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)))
    console.log('PDF converted to base64')

    // Call Google Vision API
    const visionApiKey = Deno.env.get('Google Vision') || ''
    if (!visionApiKey) {
      throw new Error('Google Vision API key not configured')
    }

    const visionRequest = {
      requests: [{
        image: { content: base64Content },
        features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
        imageContext: {
          languageHints: ['fr']
        }
      }]
    }

    console.log('Calling Google Vision API...')
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visionRequest)
      }
    )

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text()
      console.error('Vision API error:', errorText)
      throw new Error(`Vision API error: ${errorText}`)
    }

    const visionResult = await visionResponse.json()
    console.log('Vision API response received')

    const extractedText = visionResult.responses[0]?.fullTextAnnotation?.text || ''
    console.log('Extracted text:', extractedText)

    // Extract structured information
    const amount = extractAmount(extractedText)
    const date = extractDate(extractedText)
    const merchantName = extractMerchantName(extractedText)

    console.log('Extracted metadata:', { amount, date, merchantName })

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // First, verify if the invoice exists
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('id')
      .eq('id', invoiceId)
      .single()

    if (invoiceError || !invoice) {
      console.error('Invoice not found:', invoiceError)
      throw new Error('Invoice not found in database')
    }

    // Update invoice details
    const { error: updateError } = await supabase
      .from('invoicedetails')
      .upsert({
        invoice_id: invoiceId,
        amount: amount || null,
        invoice_date: date || null,
        merchant_name: merchantName || null,
        status: 'processed'
      })

    if (updateError) {
      console.error('Error updating invoice details:', updateError)
      throw updateError
    }

    console.log('Invoice details updated successfully')

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
    )

  } catch (error) {
    console.error('Error processing invoice:', error)
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
    )
  }
})

function extractAmount(text: string): number | null {
  if (!text) return null
  
  const patterns = [
    /Total\s*:\s*(\d+(?:[.,]\d{2})?)\s*(?:€|EUR)/i,
    /Montant\s*(?:total|TTC)?\s*:\s*(\d+(?:[.,]\d{2})?)\s*(?:€|EUR)/i,
    /(\d+(?:[.,]\d{2})?)\s*(?:€|EUR)/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const amount = match[1].replace(',', '.')
      return parseFloat(amount)
    }
  }
  
  return null
}

function extractDate(text: string): string | null {
  if (!text) return null

  const patterns = [
    // 30 Novembre 2024
    /(\d{1,2})\s*(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s*(\d{4})/i,
    // 30/11/2024 or 30-11-2024
    /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/,
    // 2024-11-30
    /(\d{4})-(\d{1,2})-(\d{1,2})/
  ]

  const monthMap: { [key: string]: string } = {
    'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
  }

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      if (match[2] in monthMap) {
        // Format: 30 Novembre 2024
        const day = match[1].padStart(2, '0')
        const month = monthMap[match[2].toLowerCase()]
        const year = match[3]
        return `${year}-${month}-${day}`
      } else if (match[0].includes('-') || match[0].includes('/')) {
        // Format: DD/MM/YYYY or YYYY-MM-DD
        const parts = match[0].split(/[-/]/)
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`
        } else {
          // DD/MM/YYYY
          return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
        }
      }
    }
  }
  
  return null
}

function extractMerchantName(text: string): string | null {
  if (!text) return null

  // Get the first non-empty line that's not a date or amount
  const lines = text.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && 
        trimmed.length > 2 && 
        !trimmed.match(/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/) && // Skip dates
        !trimmed.match(/^\d+(?:[.,]\d{2})?\s*(?:€|EUR)$/i)) { // Skip amounts
      return trimmed
    }
  }
  
  return null
}