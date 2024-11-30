import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VisionResponse {
  responses: Array<{
    fullTextAnnotation?: {
      text: string;
    };
  }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fileUrl, invoiceId } = await req.json()
    console.log('Processing invoice:', { fileUrl, invoiceId })

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the file content
    const response = await fetch(fileUrl)
    const fileBuffer = await response.arrayBuffer()
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)))

    // Call Google Vision API
    const visionResponse = await fetch('https://vision.googleapis.com/v1/images:annotate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GOOGLE_VISION_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [{
          image: {
            content: base64Content
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION'
            }
          ]
        }]
      })
    })

    const visionData: VisionResponse = await visionResponse.json()
    console.log('Vision API response received')

    // Extract text content
    const text = visionData.responses[0]?.fullTextAnnotation?.text || ''
    console.log('Extracted text:', text)

    // Basic extraction logic (à améliorer selon vos besoins)
    const amount = extractAmount(text)
    const date = extractDate(text)
    const status = determineStatus(date)

    // Store metadata in invoicedetails
    const { data, error: insertError } = await supabase
      .from('invoicedetails')
      .insert([{
        invoice_id: invoiceId,
        amount,
        invoice_date: date,
        status,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Error storing metadata:', insertError)
      throw insertError
    }

    console.log('Successfully stored metadata:', data)

    return new Response(
      JSON.stringify({ success: true, data }),
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
        error: error.message || 'An error occurred while processing the invoice'
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

// Utility functions for text extraction
function extractAmount(text: string): number | null {
  // Recherche des montants avec le format XX,XX € ou XX.XX €
  const amountRegex = /(\d+[.,]\d{2})\s*€/
  const match = text.match(amountRegex)
  if (match) {
    return parseFloat(match[1].replace(',', '.'))
  }
  return null
}

function extractDate(text: string): string | null {
  // Recherche des dates au format DD/MM/YYYY ou YYYY-MM-DD
  const dateRegex = /(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})/
  const match = text.match(dateRegex)
  if (match) {
    const date = match[1]
    // Convertir en format ISO si nécessaire
    if (date.includes('/')) {
      const [day, month, year] = date.split('/')
      return `${year}-${month}-${day}`
    }
    return date
  }
  return null
}

function determineStatus(date: string | null): string {
  if (!date) return 'pending'
  
  const invoiceDate = new Date(date)
  const today = new Date()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)

  if (invoiceDate < thirtyDaysAgo) {
    return 'overdue'
  } else if (invoiceDate <= today) {
    return 'paid'
  }
  return 'pending'
}