import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../analyze-invoice/cors.ts"

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // For now, just return basic success response since we're not using Google Vision
    return new Response(
      JSON.stringify({
        success: true,
        message: "Invoice received successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    )
  }
})