'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Certificate, Course, User } from '@prisma/client';
import { useGenerateCertificate } from '@/hooks/useCertGen';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const CertificateVerify = ({
  certificate,
}: {
  certificate: Certificate & { user: User; course: Course };
}) => {
  const { certificateImageUrl } = useGenerateCertificate({
    certificateDetails: {
      certificateId: certificate.id,
      course: certificate.course,
      certificateSlug: certificate.slug,
    },
    userName: certificate.user.name as string,
  });

  return (
    <div>
      <h1 className="text-4xl text-center py-4">100x Devs Certificate</h1>
      <div className="flex justify-center pb-20 mx-10">
        <Card className="my-4">
          <CardContent className="flex-none w-[90vw] max-w-[800px]">
            {certificateImageUrl ? (
              <LazyLoadImage
                src={certificateImageUrl}
                effect="blur"
                alt="Generated Certificate"
                className="w-full h-auto"
              />
            ) : (
              <div className="min-h-[500px] flex justify-center items-center">
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
