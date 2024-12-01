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

    console.log("Fetching subscriptions for user:", user?.id);

    // Get user's subscriptions
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user?.id);

    if (subError) {
      console.error("Error fetching subscriptions:", subError);
      throw subError;
    }

    console.log("Current subscriptions:", subscriptions);

    // Get all available applications for comparison
    const { data: allApps, error: appsError } = await supabase
      .from('applications')
      .select('*');

    if (appsError) {
      console.error("Error fetching applications:", appsError);
      throw appsError;
    }

    console.log("Available applications:", allApps);

    const prompt = `
En tant qu'expert en optimisation des coûts d'abonnements SaaS, analysez les données suivantes :

Abonnements actuels de l'utilisateur :
${JSON.stringify(subscriptions, null, 2)}

Applications disponibles :
${JSON.stringify(allApps, null, 2)}

Générez des recommandations personnalisées en :
1. Identifiant les doublons potentiels
2. Suggérant des alternatives moins chères mais équivalentes
3. Calculant précisément les économies mensuelles
4. Expliquant clairement l'intérêt de chaque suggestion

Répondez UNIQUEMENT avec un objet JSON valide de cette forme exacte :
{
  "recommendations": [
    {
      "title": "Titre court et descriptif",
      "description": "Description courte de l'économie",
      "saving": 12.99,
      "details": "Explication détaillée",
      "type": "alternative",
      "affected_subscriptions": ["Nom de l'app"],
      "suggested_action": "Action suggérée"
    }
  ]
}`;

    console.log("Sending request to OpenAI with prompt:", prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Vous êtes un assistant spécialisé dans l\'analyse des coûts SaaS qui répond uniquement en JSON valide.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    console.log("OpenAI raw response:", data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Format de réponse OpenAI invalide");
    }

    try {
      const content = data.choices[0].message.content.trim();
      console.log("Content to parse:", content);
      
      // Remove any potential markdown formatting
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      console.log("Cleaned content:", cleanContent);
      
      const recommendations = JSON.parse(cleanContent);
      console.log("Parsed recommendations:", recommendations);

      if (!recommendations?.recommendations || !Array.isArray(recommendations.recommendations)) {
        console.error("Invalid recommendations structure:", recommendations);
        throw new Error("Structure de recommandations invalide");
      }

      return new Response(JSON.stringify(recommendations), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      console.log("Failed content:", data.choices[0].message.content);
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