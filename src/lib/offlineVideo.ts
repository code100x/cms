import { openDB } from 'idb';

const DB_NAME = 'offline-videos';
const STORE_NAME = 'videos';

// Generate a crypto key for encryption/decryption (per user/session)
async function getKey(): Promise<CryptoKey> {
  const keyMaterial = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  return keyMaterial;
}

export async function encryptBlob(blob: Blob): Promise<{ data: ArrayBuffer; iv: Uint8Array }> {
  const key = await getKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const data = await blob.arrayBuffer();
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  return { data: encrypted, iv };
}

export async function decryptBlob(encrypted: ArrayBuffer, iv: Uint8Array): Promise<Blob> {
  const key = await getKey();
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );
  return new Blob([decrypted]);
}

export async function saveVideoToIndexedDB(contentId: number, encrypted: ArrayBuffer, iv: Uint8Array) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  await db.put(STORE_NAME, { encrypted, iv: Array.from(iv) }, contentId);
}

export async function getVideoFromIndexedDB(contentId: number): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array } | null> {
  const db = await openDB(DB_NAME, 1);
  const result = await db.get(STORE_NAME, contentId);
  if (!result) return null;
  return { encrypted: result.encrypted, iv: new Uint8Array(result.iv) };
}
