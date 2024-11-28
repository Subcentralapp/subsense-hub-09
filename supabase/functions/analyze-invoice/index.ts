import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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
    console.log('Processing invoice:', { fileUrl, invoiceId })

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the file content from Supabase Storage URL
    const response = await fetch(fileUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch file content')
    }

    // Mock analysis results for now (replace with actual OCR/analysis logic later)
    const mockAnalysis = {
      amount: Math.floor(Math.random() * 1000),
      category: 'General',
      invoice_date: new Date().toISOString().split('T')[0],
      merchant_name: 'Sample Vendor',
      status: 'processed'
    }

    console.log('Analysis results:', mockAnalysis)

    // Save analysis results to InvoiceDetails table
    const { data, error: dbError } = await supabase
      .from('InvoiceDetails')
      .insert({
        invoice_id: invoiceId,
        ...mockAnalysis
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    console.log('Successfully saved invoice details:', data)

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