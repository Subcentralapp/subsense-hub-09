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
    For each app, provide a detailed comparison focusing on:
    1. Main features and unique selling points
    2. Pricing analysis and value proposition
    3. User experience score (out of 10)
    4. Pros (list of 3-5 key advantages)
    5. Best use cases (list of 3-5 scenarios)
    6. Security features (brief description)

    Format the response as a JSON object with these fields for each app name as key:
    {
      "appName": {
        "mainFeatures": ["feature1", "feature2", ...],
        "pricingAnalysis": "detailed analysis",
        "userExperienceScore": number,
        "pros": ["pro1", "pro2", ...],
        "bestUseCases": ["case1", "case2", ...],
        "securityFeatures": {
          "description": "security description"
        }
      }
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in software analysis and comparison. Provide detailed, objective comparisons of applications. Always return valid JSON.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    let analysis;
    try {
      analysis = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e);
      throw new Error('Invalid JSON response from OpenAI');
    }

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