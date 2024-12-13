import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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
    const { 
      userId, 
      endpoint, 
      responseTime, 
      memoryUsage, 
      statusCode, 
      errorMessage, 
      metadata 
    } = await req.json()

    console.log('Logging performance metrics for endpoint:', endpoint)

    const { data, error } = await supabase
      .from('performance_logs')
      .insert([{
        user_id: userId,
        endpoint,
        response_time: responseTime,
        memory_usage: memoryUsage,
        status_code: statusCode,
        error_message: errorMessage,
        metadata
      }])

    if (error) throw error

    console.log('Performance metrics logged successfully')

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error logging performance metrics:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})