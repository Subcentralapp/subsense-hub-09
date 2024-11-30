import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CREDENTIALS = {
  type: "service_account",
  project_id: "lovelace-443112",
  private_key_id: "2a8dbef566ac8d3f1ed9bd641590ef79b9e2f663",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCyxa+mFOu4HWiU\nJCQ1XCZp+bcPENOrUgOcN5SnkBvohl+YC5Ipi34v1dEzwgZwtFn3uowKv+iegpSf\n18UDy07V03MnRVCH3Owsbd03+RQXfcSUvhkePFDZDFZDuctdw8B9V4xus1G4Tky3\nVXF4bKn9AbXAP+XbHnI4KbwpeAemvTeFfBLVWigQHjVSIfT98B/ZKiK7n6c6vqsa\nwWvAqWOGAKSqULlPPY2SP9cv12lmL2My1a7FQo2yhrAzmg4M/xrN0cMeETCieFJ8\nXwLEEkzBHBjajdd6Y7qqT1KruO9P/Dr0xY1Tqfz79C1m+4/AgQHc2FSGG+jLW9Ip\nEw4ykkDdAgMBAAECggEAF2uWGBY4DloN9BBrDPGKV8pe7NKZxGE9d1cButUCjvsh\npWfoqVgsuyQSIOt7kALUoYN3KsZa+X8mbO1l0lotdQ5bUOsAApiS+TwYZeeT9gLk\nQM9Jt6ATwGehGoTJ63oEavdP/sWvwEtDuiXvtGTZ/Tse3jWQzZzGvmxbSfx/VhzO\nTfcOWq7bWHFvB+Z+OF07b0Cv1VVZerkV8yfYKxge2orAtIKh+VvPEMDcfd42S+XV\nNXVXFpeNRmF4SpB65PDoRwdIczkpQ89sxOzVrUJ3rcTCaQBMAIU4rjlGmGUiJ7WG\nGSsdAU87E+4Zoej+M0+sJ6WEv+jN3MTrVqswj6YfGQKBgQDXvojPPBl6FJnGqFKC\nvRxcDODs4TilhdfGsxCoASlYzy5Zh26sK4dYKwEIghqjgoUOwhy3gbJ9qzEarXZB\n7pVmXCm6F03NYIXyFM/nNCrqJDqpkQ09L2JbD9GetOmfdEOqgAw9TH3CmpgxVnl+\nixiQQ3akFTOVaZXp7V6Sclm4SQKBgQDUIRsLjP3b9WWDUup214IQsjM3xpVoQnDI\nU0WnIhaiJilu7lXtccdbBdnNi9ZGwwygF4YiW9ZBZHem827PcDLwkGkhOuUJUOEe\nIjOxkWAfdzdgXvT0lXdeHUENr3OG2GIytL/OuNv25mWTio1Zf3oRBxwhLkH/zZjp\nCwkefvvL9QKBgQCFqorgun+eX30W09qrHbegYGpK2Q9bnh0eAntjW7TeTR6OYZZ0\nHVPxkFNHjjQq8ga2KhXYrAaGTbZSrP4Dw2nUzW0c2qtdf1v9rF9TA8NC5cdin3fw\nXJc3jAl3pubH4CS8UjFDGU0hcN6yUr1bZZqGZwXuiyQ2ggBburFJUoe74QKBgQCR\nJAmmMJTtcA1B+nSUVcYXeGYU7poBmRwj5N4OigNkdKn6zbYbXbMic3Ff8yLsjb5Q\nt2e+kImbeotnvr39zu37rUNRSkO1yRIOlSY7g5V6Ug6gsLf3tWDUEz4UiAyKofkm\naoemgNN4LpInjjBCoTc6+Vtk1Iqx5NGP+k4GAKp2FQKBgQDJXBKp817g8y/sXPGO\nH1a30Z39/7ovWeAFzEUfBaMfdO5v5z/37+S5QbzPUADHaDrwK5EftaGqM+IAPIyh\naTD3/cqsQjddzJRewdg3PhfVeoMEVuD81QTZ9mM4BL7kKZYUXIHpPJqWF/rs1SYH\nmiERQ46ibH/uSYansK+jp2Z1Dw==\n-----END PRIVATE KEY-----\n",
  client_email: "pdf-574@lovelace-443112.iam.gserviceaccount.com",
  client_id: "110013030382454515100",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/pdf-574%40lovelace-443112.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

async function getAccessToken() {
  try {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600; // Token expires in 1 hour

    const jwtHeader = {
      alg: 'RS256',
      typ: 'JWT'
    };

    const jwtClaimSet = {
      iss: CREDENTIALS.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-vision',
      aud: CREDENTIALS.token_uri,
      exp,
      iat
    };

    // Convert private key from PEM to ArrayBuffer
    const privateKeyPEM = CREDENTIALS.private_key
      .replace(/-----BEGIN PRIVATE KEY-----\n/, '')
      .replace(/\n-----END PRIVATE KEY-----\n?/, '')
      .replace(/\n/g, '');
    
    const binaryKey = Uint8Array.from(atob(privateKeyPEM), c => c.charCodeAt(0));
    
    // Import the private key
    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryKey,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    // Create JWT
    const headerB64 = btoa(JSON.stringify(jwtHeader));
    const claimSetB64 = btoa(JSON.stringify(jwtClaimSet));
    const signatureInput = `${headerB64}.${claimSetB64}`;

    // Sign the JWT
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      privateKey,
      new TextEncoder().encode(signatureInput)
    );

    const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
    const jwt = `${signatureInput}.${signatureB64}`;

    // Exchange JWT for access token
    const tokenResponse = await fetch(CREDENTIALS.token_uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token request failed: ${await tokenResponse.text()}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Successfully obtained access token');
    return tokenData.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl, invoiceId } = await req.json();
    console.log('Processing invoice:', { fileUrl, invoiceId });

    // Fetch the file content
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const fileBuffer = await response.arrayBuffer();
    const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));

    console.log('File content fetched and converted to base64');

    // Get access token
    const accessToken = await getAccessToken();
    console.log('Got access token');

    // Call Google Vision API
    const visionResponse = await fetch('https://vision.googleapis.com/v1/images:annotate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [{
          image: {
            content: base64Content
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION'
            }
          ]
        }]
      })
    });

    if (!visionResponse.ok) {
      const error = await visionResponse.text();
      console.error('Google Vision API error:', error);
      throw new Error(`Google Vision API error: ${error}`);
    }

    const visionData = await visionResponse.json();
    console.log('Vision API response received');

    // Extract text content
    const text = visionData.responses[0]?.fullTextAnnotation?.text || '';
    console.log('Extracted text:', text);

    // Extract metadata
    const amount = extractAmount(text);
    const date = extractDate(text);
    const status = determineStatus(date);

    console.log('Extracted metadata:', { amount, date, status });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store metadata in invoicedetails (note the lowercase table name)
    const { data, error: insertError } = await supabaseClient
      .from('invoicedetails')
      .insert([{
        invoice_id: invoiceId,
        amount,
        invoice_date: date,
        status,
        created_at: new Date().toISOString()
      }])
      .select();

    if (insertError) {
      console.error('Error storing metadata:', insertError);
      throw insertError;
    }

    console.log('Successfully stored metadata:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error processing invoice:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while processing the invoice'
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    );
  }
});

// Utility functions
function extractAmount(text: string): number | null {
  const amountRegex = /(\d+[.,]\d{2})\s*€/;
  const match = text.match(amountRegex);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }
  return null;
}

function extractDate(text: string): string | null {
  const dateRegex = /(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})/;
  const match = text.match(dateRegex);
  if (match) {
    const date = match[1];
    if (date.includes('/')) {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    }
    return date;
  }
  return null;
}

function determineStatus(date: string | null): string {
  if (!date) return 'pending';
  
  const invoiceDate = new Date(date);
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  if (invoiceDate < thirtyDaysAgo) {
    return 'overdue';
  } else if (invoiceDate <= today) {
    return 'paid';
  }
  return 'pending';
}