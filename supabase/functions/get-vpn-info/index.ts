import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides accurate information about VPN services.'
          },
          {
            role: 'user',
            content: `Please provide information about ExpressVPN, CyberGhost, and Surfshark in this exact JSON format:
            {
              "vpns": [
                {
                  "name": "name of vpn",
                  "price": monthly price in euros (number only),
                  "description": "brief description",
                  "website_url": "official website url"
                }
              ]
            }`
          }
        ],
      }),
    });

    const data = await response.json();
    const vpnInfo = JSON.parse(data.choices[0].message.content);

    // Add logos using Clearbit
    const vpnsWithLogos = vpnInfo.vpns.map((vpn: any) => ({
      ...vpn,
      category: "VPN & Sécurité",
      logo_url: `https://logo.clearbit.com/${new URL(vpn.website_url).hostname}`
    }));

    return new Response(
      JSON.stringify(vpnsWithLogos),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-vpn-info function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});