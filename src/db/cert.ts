import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import db from '@/db';
import { Course, User } from '@prisma/client';

export const getCertificates = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return [];
  }
  const purchases = await getPurchases(session?.user.email || '');
  const courses = purchases.filter((x) => x.certIssued);

  const courseWithCert: {
    course: Course;
    cert: { id: string; courseId: number; userId: string };
    user: User;
  }[] = [];

  await Promise.all(
    courses.map(async (course) => {
      console.log('inside for this');
      const certificate = await db.certificate.upsert({
        where: {
          userId_courseId: { courseId: course.id, userId: session?.user.id },
        },
        update: {},
        create: {
          userId: session?.user.id,
          courseId: course.id,
        },
        include: {
          user: true,
        },
      });

      courseWithCert.push({
        course,
        cert: {
          id: certificate.id,
          courseId: certificate.courseId,
          userId: certificate.userId,
        },
        user: certificate.user,
      });
    }),
  );

  return courseWithCert;
};
