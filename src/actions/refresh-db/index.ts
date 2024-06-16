'use server';
import db from '@/db';
import { cache } from '@/db/Cache';
import { getAllCourses } from '@/db/course';
import { authOptions } from '@/lib/auth';
import { checkUserEmailForPurchase } from '@/utiles/appx-check-mail';
import { Course } from '@prisma/client';
import { getServerSession } from 'next-auth';

type RefreshDbFn = (args: { userId: string; email: string }) => Promise<{
  error: boolean;
  message: string;
}>;

export const refreshDb: RefreshDbFn = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user.email || '';
  const userId = session?.user.id;

  if (!email) {
    return {
      error: true,
      message: 'You are not logged in',
    };
  }

  if (process.env.LOCAL_CMS_PROVIDER) {
    return { error: false, message: 'Refetched Courses' };
  }

  // Only allow user to refetch every minute
  if (cache.get('rate-limit', [email])) {
    return {
      error: true,
      message: 'Wait sometime before refetching',
    };
  }

  const allCourses = (await getAllCourses()) as Course[];

  // Check which course the user has purchased
  const userCourses = await db.userPurchases.findMany({
    where: {
      userId,
    },
  });

  const coursesWithoutUser = allCourses.filter((course) => {
    return !userCourses.some((userCourse) => userCourse.courseId === course.id);
  });

  const responses: Course[] = [];

  const promises = coursesWithoutUser
    .filter((x) => !x.openToEveryone)
    .map(async (course) => {
      const courseId = course.appxCourseId.toString();

      const data = await checkUserEmailForPurchase(email, courseId);

      if (data.data === '1') {
        responses.push(course);
      }
    });

  await Promise.all(promises);

  responses.forEach(async (res) => {
    try {
      await db.userPurchases.create({
        data: {
          userId: userId!,
          courseId: res.id,
        },
      });
    } catch {
      return { error: true, message: 'Unable to insert courses' };
    }
  });

  cache.evict('courses', [email]);
  cache.set('rate-limit', [email], true, 60);

  return { error: false, message: 'Refetched Courses' };
};
