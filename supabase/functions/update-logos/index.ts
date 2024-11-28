import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

Deno.serve(async (req) => {
  try {
    console.log('Starting logo update process...')
    
    // Récupérer toutes les applications sans logo
    const { data: apps, error: fetchError } = await supabase
      .from('applications')
      .select('name, website_url')
      .is('logo_url', null)
    
    if (fetchError) throw fetchError
    
    console.log(`Found ${apps?.length} applications without logos`)
    
    // Mettre à jour chaque application
    for (const app of apps || []) {
      try {
        const companyDomain = app.website_url 
          ? new URL(app.website_url).hostname 
          : `${app.name.toLowerCase().replace(/\s+/g, '')}.com`
        
        const logoUrl = `https://logo.clearbit.com/${companyDomain}`
        
        // Vérifier si le logo existe
        const logoCheck = await fetch(logoUrl, { method: 'HEAD' })
        
        if (logoCheck.ok) {
          console.log(`Updating logo for ${app.name} with URL: ${logoUrl}`)
          
          const { error: updateError } = await supabase
            .from('applications')
            .update({ logo_url: logoUrl })
            .eq('name', app.name)
          
          if (updateError) {
            console.error(`Error updating ${app.name}:`, updateError)
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
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in logo update process:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})