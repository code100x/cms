'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      course: certificate.course,
      certificateSlug: certificate.slug,
    },
    userName: certificate.user.name as string,
  });

  return (
    <div className="h-screen flex justify-center flex-col pb-20 mx-10">
      <h1 className="text-4xl text-center pb-4">100x Devs Certificate</h1>
      <Card className="w-500 my-4 flex">
        <CardContent className="flex-none mr-4 w-1/2">
          {certificateImageUrl ? (
            <img
              src={certificateImageUrl}
              alt="Generated Certificate"
              className="w-full h-auto"
            />
          ) : (
            'Loading...'
          )}
        </CardContent>

        <div className="flex-grow">
          <CardHeader>
            <CardTitle>
              This Certificate was issued to {certificate.user.name} for
              completing {certificate.course.title}
            </CardTitle>
            <CardDescription>
              Course Description: {certificate.course.description}
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
};
