// 'use client';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { CertificateComponent } from '@/components/Certificate';
import db from '@/db';

const CertificatePage = async () => {
  const session = await getServerSession(authOptions);
  const purchases = await db.userPurchases.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: {
        select: {
          id: true,
          imageUrl: true,
          description: true,
          title: true,
          certificate: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  //Here we are checking if for a particular user, certificate is generated or not. If not, we are generating it.
  {
    purchases?.map(async (purchase) => {
      if (!purchase.course.certificate) {
        const certificate = await db.certificate.create({
          data: {
            userId: purchase.userId,
            courseId: purchase.courseId,
          },
        });

        purchase.course.certificate = [{ id: certificate.id }];
      }
    });
  }

  return (
    <section className="flex flex-wrap justify-center items-center w-full">
      {purchases?.map((purchase) => (
        <CertificateComponent
          certificateId={purchase.course.certificate[0].id}
          course={purchase.course}
          key={purchase.course.id}
        />
      ))}
    </section>
  );
};

export default CertificatePage;
