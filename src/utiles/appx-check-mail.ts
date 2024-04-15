import { env } from '@/env';
const APPX_AUTH_KEY = env.APPX_AUTH_KEY;
const APPX_CLIENT_SERVICE = env.APPX_CLIENT_SERVICE;
const APPX_BASE_API = env.APPX_BASE_API;

const baseUrl = `${APPX_BASE_API}/get/checkemailforpurchase`;

const headers = {
  'Client-Service': APPX_CLIENT_SERVICE,
  'Auth-Key': APPX_AUTH_KEY,
};

export async function checkUserEmailForPurchase(
  email: string,
  courseId: string,
) {
  const params = new URLSearchParams({
    email,
    itemtype: '10',
    itemid: courseId,
  });
  //@ts-ignore
  const response = await fetch(`${baseUrl}?${params}`, { headers });
  return await response.json();
}
