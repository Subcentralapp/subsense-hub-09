import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

    const prompt = `En tant qu'expert en optimisation des coûts d'abonnements SaaS, analysez les données suivantes et générez des recommandations.

Abonnements actuels :
${JSON.stringify(subscriptions, null, 2)}

Applications disponibles :
${JSON.stringify(allApps, null, 2)}

Générez 3 recommandations personnalisées en suivant EXACTEMENT ce format JSON :
{
  "recommendations": [
    {
      "title": "Titre court et descriptif",
      "description": "Description courte de la recommandation",
      "saving": 12.99,
      "details": "Explication détaillée de la recommandation",
      "type": "alternative",
      "websiteUrl": "https://example.com"
    }
  ]
}`;

    console.log("Sending request to OpenAI with prompt");

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
            content: 'Vous êtes un assistant spécialisé qui répond uniquement en JSON valide selon le format demandé.' 
          },
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
        throw new Error("Structure de recommandations invalide");
      }

      return new Response(JSON.stringify(recommendations), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
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