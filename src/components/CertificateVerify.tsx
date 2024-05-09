'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Certificate, Course, User } from '@prisma/client';

export const CertificateVerify = ({
  certificate,
}: {
  certificate: Certificate & { user: User; course: Course };
}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await fetch(
          `/api/certificate/get?certificateId=${certificate.id}&userName=${certificate.user.name || ''}`,
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    };
    if (!imageUrl) generateImage();
  }, []);

  return (
    <div>
      <Card className="w-500 my-4 flex">
        <CardContent className="flex-none mr-4 w-1/2">
          {imageUrl ? (
            <img
              src={imageUrl}
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
