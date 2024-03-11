import {
  getAllCoursesAndContentHierarchy,
  getAllVideos,
  getVideoProgressForUser,
} from '@/db/course';
import { authOptions } from '@/lib/auth';
import { Course } from '@/store/atoms';
import { getServerSession } from 'next-auth';

const APPX_AUTH_KEY = process.env.APPX_AUTH_KEY;
const APPX_CLIENT_SERVICE = process.env.APPX_CLIENT_SERVICE;
const APPX_BASE_API = process.env.APPX_BASE_API;
const LOCAL_CMS_PROVIDER = process.env.LOCAL_CMS_PROVIDER;

// Cache to store API responses for 1 day
const cache = new Map();

export async function getPurchases(email: string) {
  const cacheKey = `purchases_${email}`;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse && Date.now() - cachedResponse.timestamp < 24 * 60 * 60 * 1000) {
    return cachedResponse.data; // Return cached data if it exists and is not expired
  }

  const _courses = await getAllCoursesAndContentHierarchy();
  const session = await getServerSession(authOptions);
  const userVideoProgress = await getVideoProgressForUser(
    session?.user?.id || '',
    true,
  );
  const allVideos = await getAllVideos();

  // Your existing code for processing courses...

  let responses: Course[] = [];

  const promises = courses.map(async (course) => {
    const params = new URLSearchParams({
      email,
      itemtype: '10',
      itemid: course.appxCourseId.toString(),
    });
    //@ts-ignore
    const response = await fetch(`${baseUrl}?${params}`, { headers });
    const data = await response.json();

    if (data.data === '1') {
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

  // Cache the response
  cache.set(cacheKey, { data: responses, timestamp: Date.now() });

  return responses;
}
