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

    const systemPrompt = {
      role: 'system',
      content: `En tant qu'expert en optimisation des coûts d'abonnements SaaS, analysez les abonnements et suggérez des optimisations.
      Répondez UNIQUEMENT avec un objet JSON valide contenant un tableau 'recommendations'.
      Chaque recommandation doit avoir exactement cette structure:
      {
        "title": "string court et descriptif",
        "description": "string court expliquant l'économie",
        "saving": number (montant économisé),
        "details": "string détaillant la recommandation",
        "type": "consolidation" ou "alternative",
        "affected_subscriptions": ["string"],
        "suggested_action": "string"
      }`
    };

    const userPrompt = {
      role: 'user',
      content: `Voici les abonnements actuels: ${JSON.stringify(subscriptions)}
      Et voici toutes les applications disponibles: ${JSON.stringify(allApps)}
      
      Analysez ces données et suggérez des optimisations pertinentes.
      Assurez-vous de:
      1. Identifier les doublons potentiels
      2. Trouver des alternatives moins chères mais équivalentes
      3. Calculer précisément les économies mensuelles potentielles
      4. Expliquer clairement pourquoi chaque suggestion est pertinente
      
      IMPORTANT: Répondez uniquement avec un objet JSON valide.`
    };

    console.log("Sending request to OpenAI with prompts:", { systemPrompt, userPrompt });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [systemPrompt, userPrompt],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    console.log("OpenAI raw response:", data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Format de réponse OpenAI invalide");
    }

    try {
      const rawContent = data.choices[0].message.content.trim();
      console.log("Raw content to parse:", rawContent);
      
      // Try to clean the response if it contains markdown
      const cleanedContent = rawContent.replace(/```json\n?|\n?```/g, '');
      console.log("Cleaned content:", cleanedContent);
      
      const recommendations = JSON.parse(cleanedContent);
      console.log("Successfully parsed recommendations:", recommendations);

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