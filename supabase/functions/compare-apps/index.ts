import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    console.log('Starting comparison for apps:', apps);

    const openAIApiKey = "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";
    console.log('OpenAI API Key validation:', {
      present: !!openAIApiKey,
      keyPrefix: openAIApiKey?.substring(0, 7),
      keyLength: openAIApiKey?.length
    });
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }
    
    const prompt = `Compare these applications in detail: ${apps.map(app => `${app.name} (${app.category}) at ${app.price}€/month`).join(', ')}. 
    For each app, provide a detailed comparison focusing on:
    1. Main features and unique selling points
    2. Pricing analysis and value proposition (use the exact price provided, ${apps.map(app => `${app.price}€ for ${app.name}`).join(' and ')})
    3. User experience score (out of 10)
    4. Pros (list of 3-5 key advantages)
    5. Best use cases (list of 3-5 scenarios)
    6. Security features (brief description)

    Format the response as a JSON object with these fields for each app name as key:
    {
      "appName": {
        "mainFeatures": ["feature1", "feature2", ...],
        "pricingAnalysis": "detailed analysis mentioning the exact monthly price of X€",
        "userExperienceScore": number,
        "pros": ["pro1", "pro2", ...],
        "bestUseCases": ["case1", "case2", ...],
        "securityFeatures": {
          "description": "security description"
        }
      }
    }

    Important: Always use the exact prices provided in the input (${apps.map(app => `${app.price}€ for ${app.name}`).join(' and ')}) and mention them explicitly in the pricingAnalysis.`;

    console.log('Initiating OpenAI API request with gpt-3.5-turbo...');

    const openAIRequest = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in software analysis and comparison. Provide detailed, objective comparisons of applications. Always return valid JSON and use the exact prices provided in the input.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    };

    console.log('OpenAI request configuration:', {
      model: openAIRequest.model,
      messageCount: openAIRequest.messages.length,
      temperature: openAIRequest.temperature
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(openAIRequest),
    });

    console.log('OpenAI API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error response:', errorData);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Service temporairement indisponible",
            message: "Le service de comparaison est momentanément indisponible. Veuillez réessayer plus tard.",
            code: "QUOTA_EXCEEDED"
          }), 
          {
            status: 503,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully:', {
      model: data.model,
      usage: data.usage,
      choicesCount: data.choices?.length
    });

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response structure from OpenAI');
    }

    let analysis;
    try {
      analysis = JSON.parse(data.choices[0].message.content);
      console.log('Analysis parsed successfully:', {
        appsAnalyzed: Object.keys(analysis).length,
        totalCharacters: data.choices[0].message.content.length
      });
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e, data.choices[0].message.content);
      throw new Error('Invalid JSON response from OpenAI');
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in compare-apps function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});