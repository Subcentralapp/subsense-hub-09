import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apps } = await req.json();
    console.log('Comparing apps:', apps);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    const prompt = `Compare these applications in detail: ${apps.map(app => app.name).join(', ')}. 
    For each app, provide:
    1. Main features and unique selling points
    2. Pricing analysis (value for money, different tiers)
    3. User experience score (out of 10)
    4. Integration capabilities
    5. Target audience
    6. Pros and cons
    7. Best use cases
    8. Performance metrics
    9. Security features
    10. Customer support quality
    
    Format the response as a JSON object with these fields for each app.`;

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
            content: 'You are an expert in software analysis and comparison. Provide detailed, objective comparisons of applications.'
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in compare-apps function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});