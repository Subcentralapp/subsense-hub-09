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
    console.log('Starting price update process...');
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all applications
    const { data: apps, error: appsError } = await supabase
      .from('applications')
      .select('name, price');

    if (appsError) throw appsError;

    console.log('Retrieved applications:', apps);

    // Query OpenAI for each application's current price
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    for (const app of apps) {
      console.log(`Checking price for ${app.name}...`);
      
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
              content: 'You are a helpful assistant that provides current subscription prices for applications and services. Respond only with the numerical price in euros, without any text or currency symbol.'
            },
            {
              role: 'user',
              content: `What is the current monthly subscription price in euros for ${app.name} in France?`
            }
          ],
        }),
      });

      const data = await response.json();
      const newPrice = parseFloat(data.choices[0].message.content.trim());
      
      if (!isNaN(newPrice) && newPrice > 0) {
        console.log(`Updating price for ${app.name} to ${newPrice}€`);
        
        const { error: updateError } = await supabase
          .from('applications')
          .update({ price: newPrice })
          .eq('name', app.name);

        if (updateError) {
          console.error(`Error updating price for ${app.name}:`, updateError);
        }
      } else {
        console.log(`Invalid price received for ${app.name}: ${data.choices[0].message.content}`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Prices updated successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in update-prices function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});