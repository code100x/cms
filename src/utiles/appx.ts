import db from "@/db";
import { Course } from "@/store/atoms";

const APPX_AUTH_KEY = process.env.APPX_AUTH_KEY;
const APPX_CLIENT_SERVICE = process.env.APPX_CLIENT_SERVICE;
const APPX_BASE_API = process.env.APPX_BASE_API;
const LOCAL_CMS_PROVIDER = process.env.LOCAL_CMS_PROVIDER;

export async function getPurchases(email: string) {
  const courses = await db.course.findMany({});
  if (LOCAL_CMS_PROVIDER) {
    return courses;
  }

  const baseUrl = `${APPX_BASE_API}/get/checkemailforpurchase`;

  const headers = { 'Client-Service': APPX_CLIENT_SERVICE, 'Auth-Key': APPX_AUTH_KEY }

  const responses: Course[] = [];

  const promises = courses.map(async (course) => {
    const params = new URLSearchParams({ email, itemtype: '10', itemid: course.appxCourseId.toString() });
    //@ts-ignore
    const response = await fetch(`${baseUrl}?${params}`, { headers });
    const data = await response.json();

    if (data.data === "1") {
      responses.push(course);
    }

  });

  await Promise.all(promises);

  if (responses.length) {
    for (const course of courses) {
      if (course.openToEveryone) {
        responses.push(course);
      }
    }
  }
  return responses;
}
