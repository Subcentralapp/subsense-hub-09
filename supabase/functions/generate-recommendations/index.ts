import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user's subscriptions
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user?.id);

    console.log("Generating recommendations for user:", user?.id);
    console.log("Current subscriptions:", subscriptions);

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
            content: `Tu es un expert en optimisation des coûts d'abonnements. 
            Analyse les abonnements actuels de l'utilisateur et suggère des alternatives plus économiques.
            Réponds en français et en JSON avec le format suivant:
            {
              "recommendations": [
                {
                  "title": "Titre de la recommandation",
                  "description": "Description courte",
                  "saving": "Montant de l'économie par mois",
                  "details": "Description détaillée",
                  "websiteUrl": "URL de l'offre alternative"
                }
              ]
            }`
          },
          { 
            role: 'user', 
            content: `Voici les abonnements actuels de l'utilisateur: ${JSON.stringify(subscriptions)}
            Suggère 2-3 alternatives plus économiques avec des services similaires.` 
          }
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    return new Response(JSON.stringify(data.choices[0].message.content), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});