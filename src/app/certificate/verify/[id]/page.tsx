import { CertificateVerify } from '@/components/CertificateVerify';
import db from '@/db';
import { User, Certificate, Course } from '@prisma/client';

export default async function VerifyPage({
  params,
}: {
  params: { id: string };
}) {
  const certificateSlug = params.id;
  const certificate: (Certificate & { user: User; course: Course }) | null =
    await db.certificate.findFirst({
      where: {
        slug: certificateSlug,
      },
      include: {
        user: true,
        course: true,
      },
    });

  if (!certificate) return <div>Not Found</div>;

  return <CertificateVerify certificate={certificate} />;
}
