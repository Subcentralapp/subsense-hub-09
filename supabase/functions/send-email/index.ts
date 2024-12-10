import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Vérifier la méthode HTTP
    if (req.method !== 'POST') {
      throw new Error('Method not allowed')
    }

    // Récupérer les données de la requête
    const { to, subject, text } = await req.json()

    // Vérifier les données requises
    if (!to || !subject || !text) {
      throw new Error('Missing required fields: to, subject, text')
    }

    // Configurer le client SMTP
    const client = new SmtpClient()

    await client.connectTLS({
      hostname: Deno.env.get('BREVO_SMTP_HOST') || '',
      port: Number(Deno.env.get('BREVO_SMTP_PORT')) || 587,
      username: Deno.env.get('BREVO_SMTP_USER') || '',
      password: Deno.env.get('BREVO_SMTP_PASS') || '',
    })

    // Envoyer l'email
    await client.send({
      from: "subcentralapp@gmail.com",
      to: to,
      subject: subject,
      content: text,
    })

    await client.close()

    // Retourner une réponse de succès
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error sending email:', error)

    // Retourner une réponse d'erreur
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An error occurred while sending the email' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})