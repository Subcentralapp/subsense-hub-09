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
    const { subscriptions } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    // Créer un client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Récupérer toutes les applications disponibles
    const { data: allApplications } = await supabase
      .from('applications')
      .select('*');

    // Préparer le prompt pour OpenAI
    const prompt = `En tant qu'expert en optimisation des abonnements, analyse ces abonnements actuels:
    ${JSON.stringify(subscriptions)}
    
    Et cette liste d'applications disponibles:
    ${JSON.stringify(allApplications)}
    
    Recommande 2-3 alternatives plus économiques en te basant sur:
    1. Le prix (doit être moins cher)
    2. Les fonctionnalités similaires
    3. La qualité du service
    
    Format de réponse souhaité (JSON):
    {
      "recommendations": [
        {
          "currentApp": "Nom de l'app actuelle",
          "recommendedApp": "Nom de l'app recommandée",
          "potentialSavings": "Montant économisé par mois",
          "reason": "Raison de la recommandation"
        }
      ]
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Tu es un expert en optimisation des coûts d\'abonnements.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const recommendations = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(recommendations), {
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