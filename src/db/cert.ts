import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import db from '@/db';
import { Course } from '@/store/atoms';

export const getCertificates = async () => {
  console.log('get certificate');
  const session = await getServerSession(authOptions);
  const purchases = await getPurchases(session?.user.email || '');
  const courses = purchases.filter((x) => x.certIssued);
  const courseWithCert: {
    course: Course;
    cert: {
      id: string;
      courseId: number;
    };
  }[] = [];
  console.log(courses);

  await Promise.all(
    courses.map(async (course) => {
      console.log('inside for this');
      const certificate = await db.certificate.upsert({
        where: {
          userId_courseId: {
            courseId: course.id,
            userId: session?.user.id,
          },
        },
        update: {},
        create: {
          userId: session?.user.id,
          courseId: course.id,
        },
      });
      courseWithCert.push({ course, cert: certificate });
    }),
  );

  console.log(courseWithCert);

  return courseWithCert;
};

export async function getCertificate(certificateId: string) {
  const certificate = await db.certificate.findFirst({
    where: {
      id: certificateId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return certificate;
}
