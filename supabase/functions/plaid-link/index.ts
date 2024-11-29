import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@plaid/plaid-node@14.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PLAID_CLIENT_ID = Deno.env.get('PLAID_CLIENT_ID')
const PLAID_SECRET = Deno.env.get('PLAID_SECRET')
const PLAID_ENV = 'sandbox' // Changer en 'development' ou 'production' pour la production

const plaidClient = new createClient({
  clientID: PLAID_CLIENT_ID!,
  secret: PLAID_SECRET!,
  env: PLAID_ENV as any,
  options: {
    version: '2020-09-14',
  },
})

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action } = await req.json()

    switch (action) {
      case 'create_link_token': {
        const tokenResponse = await plaidClient.linkTokenCreate({
          user: { client_user_id: 'user-id' },
          client_name: 'SubManager',
          products: ['transactions'],
          country_codes: ['FR'],
          language: 'fr',
        })

        return new Response(JSON.stringify(tokenResponse.data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'exchange_public_token': {
        const { public_token } = await req.json()
        const response = await plaidClient.itemPublicTokenExchange({
          public_token: public_token,
        })

        // Stocker access_token de manière sécurisée pour l'utilisateur
        const access_token = response.data.access_token

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'get_transactions': {
        // Implémenter la logique pour récupérer les transactions
        // et identifier les abonnements récurrents
        return new Response(JSON.stringify({ message: 'Not implemented yet' }), {
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