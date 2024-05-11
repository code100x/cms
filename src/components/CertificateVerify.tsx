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
import { useCertPng } from '@/hooks/useCert';

export const CertificateVerify = ({
  certificate,
}: {
  certificate: Certificate & { user: User; course: Course };
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const { imgUri, setImgClicked } = useCertPng(certificate.id);

  useEffect(() => {
    setImgClicked(true);
  }, []);

  useEffect(() => {
    if (imgUri) {
      //convert dataUri to downloadable URI
      const imgBlob = getImgBlob(imgUri);
      const downloadImgUri = URL.createObjectURL(imgBlob);
      setImageUrl(downloadImgUri);
    }
  }, [imgUri]);

  function getImgBlob(dataUri: string) {
    const base64Data = dataUri.split(',')[1];
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }

    // Convert ArrayBuffer to Blob
    const blob = new Blob([arrayBuffer], { type: 'image/png' });

    return blob;
  }

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
