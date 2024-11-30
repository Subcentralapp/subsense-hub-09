import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PLAID_CLIENT_ID = Deno.env.get('PLAID_CLIENT_ID')
const PLAID_SECRET = Deno.env.get('PLAID_SECRET')
const PLAID_ENV = 'sandbox' // Changer en 'development' ou 'production' pour la production

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, public_token } = await req.json()
    console.log('Processing Plaid action:', action)

    const plaidApiUrl = 'https://sandbox.plaid.com' // Changer l'URL selon l'environnement

    switch (action) {
      case 'create_link_token': {
        console.log('Creating link token...')
        const response = await fetch(`${plaidApiUrl}/link/token/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            user: { client_user_id: 'user-id' },
            client_name: 'SubManager',
            products: ['transactions'],
            country_codes: ['FR'],
            language: 'fr',
          }),
        })

        const data = await response.json()
        console.log('Link token created:', data)

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'exchange_public_token': {
        console.log('Exchanging public token...')
        const response = await fetch(`${plaidApiUrl}/item/public_token/exchange`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            public_token: public_token,
          }),
        })

        const data = await response.json()
        console.log('Token exchanged successfully')

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      default:
        return new Response(JSON.stringify({ error: 'Action non supportée' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})