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
  const response = await getPurchases(session?.user.email || '');
  if (response.type === 'error') {
    return [];
  }
  const purchases = response.courses;
  const courses = purchases.filter((x) => x.certIssued === true);

  const courseWithCert: {
    course: Course;
    cert: { id: string; courseId: number; userId: string; slug: string };
    user: User;
  }[] = [];

  await Promise.all(
    courses.map(async (course) => {
      const certificate = await db.certificate.upsert({
        where: {
          userId_courseId: { courseId: course.id, userId: session?.user.id },
        },
        update: {},
        create: {
          userId: session?.user.id,
          courseId: course.id,
          slug: generateUniqueCertId(),
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
          slug: certificate.slug,
        },
        user: certificate.user,
      });
    }),
  );

  return courseWithCert;
};

function generateUniqueCertId() {
  const POSSIBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const ID_LENGTH = 8;
  let id = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    id += POSSIBLE_CHARS.charAt(
      Math.floor(Math.random() * POSSIBLE_CHARS.length),
    );
  }
  return id;
}
