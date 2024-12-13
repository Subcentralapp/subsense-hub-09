import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as CryptoJS from 'https://esm.sh/crypto-js@4.1.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      req.headers.get('Authorization')?.split(' ')[1] ?? ''
    )

    if (authError || !user) {
      throw new Error('Non autorisé')
    }

    const { data, tableName } = await req.json()
    const serverKey = Deno.env.get('ENCRYPTION_KEY') ?? ''
    
    // Double encryption: client + server
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      serverKey
    ).toString()

    const { error: dbError } = await supabaseClient
      .from(tableName)
      .insert([{
        user_id: user.id,
        server_encrypted_data: encryptedData,
        created_at: new Date().toISOString()
      }])

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ message: 'Données chiffrées avec succès' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})