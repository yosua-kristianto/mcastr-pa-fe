export async function generateAuthToken(body: object, secret?: string): Promise<string> {
  // Ensure we have a secret: try several env locations
  const secretFromEnv = import.meta.env.VITE_SECRET;

  if (!secretFromEnv) {
    throw new Error('HMAC secret not found. Please set SECRET in your environment.');
  }

  // Minified JSON string: JSON.stringify produces compact string
  const jsonString = JSON.stringify(body);

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretFromEnv);
  const msgData = encoder.encode(jsonString);

  // Import key for HMAC-SHA-512
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-512' } },
    false,
    ['sign']
  );

  // Sign the message
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);

  // Convert ArrayBuffer to base64
  const base64 = arrayBufferToBase64(signature);
  return base64;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  // Browser-friendly conversion
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
  }
  // btoa is available in browsers
  return btoa(binary);
}