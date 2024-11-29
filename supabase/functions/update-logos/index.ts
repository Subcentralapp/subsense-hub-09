import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting logo update process...')
    
    const { data: apps, error: fetchError } = await supabase
      .from('applications')
      .select('name, website_url, logo_url')
      .is('logo_url', null)
    
    if (fetchError) throw fetchError
    
    console.log(`Found ${apps?.length} applications without logos`)
    
    for (const app of apps || []) {
      try {
        const companyDomain = app.website_url 
          ? new URL(app.website_url).hostname 
          : `${app.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
        
        const logoUrl = `https://logo.clearbit.com/${companyDomain}`
        console.log(`Trying to fetch logo for ${app.name} from: ${logoUrl}`)
        
        const logoCheck = await fetch(logoUrl, { method: 'HEAD' })
        
        if (logoCheck.ok) {
          console.log(`Logo found for ${app.name}, updating database...`)
          
          const { error: updateError } = await supabase
            .from('applications')
            .update({ logo_url: logoUrl })
            .eq('name', app.name)
          
          if (updateError) {
            console.error(`Error updating ${app.name}:`, updateError)
          } else {
            console.log(`Successfully updated logo for ${app.name}`)
          }
        } else {
          console.log(`No logo found for ${app.name} at ${logoUrl}`)
        }
      } catch (error) {
        console.error(`Error processing ${app.name}:`, error)
        continue
      }
    }
    
    return new Response(
      JSON.stringify({ message: 'Logo update process completed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in logo update process:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})