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

    const systemPrompt = {
      role: 'system',
      content: 'Vous êtes un expert en optimisation des coûts SaaS. Analysez les abonnements et suggérez des optimisations. Répondez avec un objet JSON contenant un tableau "recommendations". Format: {"recommendations": [{"title": "string", "description": "string", "saving": number, "details": "string", "type": "string", "affected_subscriptions": ["string"], "suggested_action": "string"}]}'
    };

    const userPrompt = {
      role: 'user',
      content: `Analysez ces abonnements: ${JSON.stringify(subscriptions)} et ces applications disponibles: ${JSON.stringify(allApps)}. Identifiez les doublons, trouvez des alternatives moins chères, calculez les économies mensuelles. Répondez uniquement en JSON valide.`
    };

    console.log("Sending request to OpenAI");

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [systemPrompt, userPrompt],
        temperature: 0.5,
        max_tokens: 1500,
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
      
      const recommendations = JSON.parse(content);
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