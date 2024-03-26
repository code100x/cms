'use server';
import db from '@/db';
import { Cache } from '@/db/Cache';
import { getAllCourses } from '@/db/course';
import { checkUserEmailForPurchase } from '@/utiles/appx-check-mail';
import { Course } from '@prisma/client';

type RefreshDbFn = (args: { userId: string; email: string }) => Promise<{
  error: boolean;
  message: string;
}>;

export const refreshDb: RefreshDbFn = async ({ userId, email }) => {
  // Only allow user to refetch every minute
  if (Cache.getInstance().get('rate-limit', [userId])) {
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
          userId,
          courseId: res.id,
        },
      });
    } catch {
      return { error: true, message: 'Unable to insert courses' };
    }
  });

  Cache.getInstance().evict('courses', [email]);
  Cache.getInstance().set('rate-limit', [userId], true, 60);

  return { error: false, message: 'Refetched Courses' };
};
