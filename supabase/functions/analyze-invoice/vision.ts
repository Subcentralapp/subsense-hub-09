import { corsHeaders } from './cors.ts';

export async function analyzeImageWithVision(base64Content: string) {
  const visionApiKey = Deno.env.get('Google Vision');
  if (!visionApiKey) {
    throw new Error('Google Vision API key not configured');
  }

  console.log('Calling Google Vision API...');
  const visionResponse = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [{
          image: { content: base64Content },
          features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
          imageContext: {
            languageHints: ['fr']
          }
        }]
      })
    }
  );

  if (!visionResponse.ok) {
    const errorText = await visionResponse.text();
    console.error('Vision API error:', errorText);
    throw new Error(`Vision API error: ${errorText}`);
  }

  const result = await visionResponse.json();
  console.log('Vision API response received successfully');
  return result;
}