'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Certificate, Course, User } from '@prisma/client';
import { useGenerateCertificate } from '@/hooks/useCertGen';

export const CertificateVerify = ({
  certificate,
}: {
  certificate: Certificate & { user: User; course: Course };
}) => {
  const { certificateImageUrl } = useGenerateCertificate({
    certificateDetails: {
      certificateId: certificate.id,
      //@ts-ignore
      course: certificate.course,
      certificateSlug: certificate.slug,
    },
    userName: certificate.user.name as string,
  });

  return (
    <div>
      <h1 className="py-4 text-center text-4xl">100x Devs Certificate</h1>
      <div className="mx-10 flex justify-center pb-20">
        <Card className="my-4">
          <CardContent className="w-[90vw] max-w-[800px] flex-none">
            {certificateImageUrl ? (
              <img
                src={certificateImageUrl}
                alt="Generated Certificate"
                className="h-auto w-full"
              />
            ) : (
              <div className="flex min-h-[500px] items-center justify-center">
                Loading...
              </div>
            )}
          </CardContent>

          <div className="flex justify-center">
            <CardHeader>
              <CardTitle>
                This Certificate was issued to {certificate.user.name} for
                completing {certificate.course.title}
              </CardTitle>
            </CardHeader>
          </div>
        </Card>
      </div>
    </div>
  );
};
