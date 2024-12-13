import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RateLimitConfig {
  maxRequests: number;  // Nombre maximum de requêtes
  windowMs: number;     // Fenêtre de temps en millisecondes
}

const defaultLimits: { [key: string]: RateLimitConfig } = {
  default: { maxRequests: 100, windowMs: 60000 }, // 100 requêtes par minute par défaut
  auth: { maxRequests: 5, windowMs: 60000 },      // 5 tentatives de connexion par minute
  api: { maxRequests: 50, windowMs: 60000 },      // 50 requêtes API par minute
}

Deno.serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { endpoint, userId, ip } = await req.json()
    console.log(`Rate limit check for endpoint: ${endpoint}, userId: ${userId}, ip: ${ip}`)

    // Initialiser le client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Déterminer les limites basées sur l'endpoint
    const limits = defaultLimits[endpoint] || defaultLimits.default
    const key = `rate_limit:${endpoint}:${userId || ip}`
    const now = Date.now()
    const windowStart = now - limits.windowMs

    // Nettoyer les anciennes entrées et compter les requêtes récentes
    const { count } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact' })
      .eq('key', key)
      .gte('timestamp', new Date(windowStart).toISOString())

    console.log(`Current request count for ${key}: ${count}`)

    if (count >= limits.maxRequests) {
      console.log(`Rate limit exceeded for ${key}`)
      return new Response(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: Math.ceil((windowStart + limits.windowMs - now) / 1000)
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((windowStart + limits.windowMs - now) / 1000).toString()
          }
        }
      )
    }

    // Enregistrer la nouvelle requête
    const { error: insertError } = await supabase
      .from('rate_limits')
      .insert({
        key,
        timestamp: new Date(now).toISOString(),
        endpoint
      })

    if (insertError) {
      console.error('Error inserting rate limit record:', insertError)
      throw insertError
    }

    return new Response(
      JSON.stringify({ allowed: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Rate limiter error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})