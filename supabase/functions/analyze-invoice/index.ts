import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const VISION_API_KEY = 'f07affdf97888730831641bf91ad56bafefdaf88';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fileUrl, invoiceId } = await req.json()
    console.log('Analyzing invoice:', { fileUrl, invoiceId })

    // Fetch the file content from Supabase Storage URL
    const response = await fetch(fileUrl)
    const fileBuffer = await response.arrayBuffer()
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)))

    // Call Google Vision API
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            image: { content: base64Content },
            features: [{ type: 'TEXT_DETECTION' }]
          }]
        })
      }
    )

    const visionData = await visionResponse.json()
    console.log('Vision API response received')

    if (!visionData.responses?.[0]?.textAnnotations?.[0]?.description) {
      throw new Error('No text found in the image')
    }

    const text = visionData.responses[0].textAnnotations[0].description
    console.log('Extracted text:', text)

    // Extract information using regex patterns
    const amountMatch = text.match(/(?:€|EUR)\s*(\d+(?:[.,]\d{2})?)/i)
    const dateMatch = text.match(/(\d{2}[/-]\d{2}[/-]\d{4})|(\d{4}[/-]\d{2}[/-]\d{2})/)
    
    // Basic category detection based on keywords
    const categories = {
      'NETFLIX': 'Streaming',
      'SPOTIFY': 'Musique',
      'AMAZON': 'Shopping',
      'EDF': 'Énergie',
      'ENGIE': 'Énergie',
      'ORANGE': 'Télécom',
      'SFR': 'Télécom',
      'FREE': 'Télécom'
    }

    let detectedCategory = 'Autre'
    for (const [keyword, category] of Object.entries(categories)) {
      if (text.toUpperCase().includes(keyword)) {
        detectedCategory = category
        break
      }
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Save extracted information
    const { data, error } = await supabase
      .from('InvoiceDetails')
      .insert({
        invoice_id: invoiceId,
        amount: amountMatch ? parseFloat(amountMatch[1].replace(',', '.')) : null,
        category: detectedCategory,
        invoice_date: dateMatch ? new Date(dateMatch[0]).toISOString() : null,
        merchant_name: text.split('\n')[0]?.trim() || 'Inconnu',
        status: 'processed'
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing invoice:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})