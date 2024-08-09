const APPX_AUTH_KEY = process.env.APPX_AUTH_KEY;
const APPX_CLIENT_SERVICE = process.env.APPX_CLIENT_SERVICE;
const APPX_BASE_API = process.env.APPX_BASE_API;

const baseUrl: string = `${APPX_BASE_API}/get/checkemailforpurchase`;

const headers: any = {
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
  console.log(courseId);
  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers,
    });
    return await response.json();
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
