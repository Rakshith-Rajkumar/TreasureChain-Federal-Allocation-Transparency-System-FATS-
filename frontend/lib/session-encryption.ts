// lib/session-encryption.ts
const algorithm = { name: 'AES-GCM', length: 256 };

export async function createSecureSession(userData: object) {
  const key = await crypto.subtle.generateKey(algorithm, true, ['encrypt', 'decrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(userData));
  
  const ciphertext = await crypto.subtle.encrypt(
    { name: algorithm.name, iv },
    key,
    encoded
  );

  return {
    iv: bufferToHex(iv),
    ciphertext: bufferToHex(new Uint8Array(ciphertext)),
    key: await crypto.subtle.exportKey('jwk', key)
  };
}
function bufferToHex(buffer: Uint8Array): string {
    return Array.from(buffer)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

