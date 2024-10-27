import db from '@/db';

export async function checkUserCourse(userId: string, courseId: string) {
  const userCourse = await db.course.findFirst({
    where: {
      purchasedBy: {
        some: {
          userId,
        },
      },
      id: parseInt(courseId, 10),
    },
  });

  return userCourse !== null;
}