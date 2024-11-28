import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Mock metadata extraction (à remplacer par l'intégration réelle de Google Vision)
    const mockMetadata = {
      Name: invoiceId,
      Price: Math.floor(Math.random() * 1000),
      date: new Date().toISOString()
    }

    console.log('Extracted metadata:', mockMetadata)

    // Store metadata in the Métadonné table
    const { data, error: insertError } = await supabase
      .from('Métadonné')
      .insert([mockMetadata])
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