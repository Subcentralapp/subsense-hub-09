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
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user?.id);

    if (subError) {
      throw subError;
    }

    console.log("Analyzing subscriptions for user:", user?.id);
    console.log("Current subscriptions:", subscriptions);

    // Get all available applications for comparison
    const { data: allApps, error: appsError } = await supabase
      .from('applications')
      .select('*');

    if (appsError) {
      throw appsError;
    }

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
            content: "Tu es un expert en optimisation des coûts d'abonnements SaaS. Analyse les abonnements actuels de l'utilisateur et suggère des optimisations en: 1. Identifiant les abonnements redondants ou similaires qui pourraient être consolidés 2. Trouvant des alternatives moins chères avec des fonctionnalités similaires 3. Calculant les économies potentielles mensuelles pour chaque suggestion. Format de réponse attendu: {\"recommendations\": [{\"title\": \"string\", \"description\": \"string\", \"saving\": \"number\", \"details\": \"string\", \"type\": \"string\", \"affected_subscriptions\": [\"string\"], \"suggested_action\": \"string\"}]}"
          },
          { 
            role: 'user', 
            content: `Voici les abonnements actuels de l'utilisateur: ${JSON.stringify(subscriptions)}
            Et voici toutes les applications disponibles: ${JSON.stringify(allApps)}
            
            Analyse ces données et suggère des optimisations pertinentes.
            Assure-toi de:
            1. Identifier les doublons potentiels (ex: plusieurs services de streaming)
            2. Trouver des alternatives moins chères mais équivalentes
            3. Calculer précisément les économies mensuelles potentielles
            4. Expliquer clairement pourquoi chaque suggestion est pertinente` 
          }
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Format de réponse OpenAI invalide");
    }

    // Ensure we're getting valid JSON from OpenAI
    try {
      const recommendations = JSON.parse(data.choices[0].message.content);
      console.log("Parsed recommendations:", recommendations);

      // Validate the structure
      if (!recommendations?.recommendations || !Array.isArray(recommendations.recommendations)) {
        throw new Error("Structure de recommandations invalide");
      }

      return new Response(JSON.stringify(recommendations), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      console.log("Raw content:", data.choices[0].message.content);
      throw new Error("Impossible de parser la réponse d'OpenAI");
    }
  } catch (error) {
    console.error('Error in generate-recommendations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});