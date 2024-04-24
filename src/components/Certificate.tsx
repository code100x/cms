'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

interface PurchaseType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  appxCourseId: number;
  openToEveryone: boolean;
  slug: string;
  discordRoleId: string;
  totalVideos?: number;
  totalVideosWatched: number;
}

export const CertificateComponent = ({ course }: { course: PurchaseType }) => {
  const handleDownloadPDF = async () => {
    const response = await fetch(
      `/api/certificate/download?courseId=${course.id}`,
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificate.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleShareLinkedIn = () => {};

  const handleShareTwitter = () => {};

  return (
    <Card className="w-500" key={course.id}>
      <CardContent className="flex justify-center">
        <img src={course.imageUrl} alt="" width={100} height={100} />
      </CardContent>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleDownloadPDF()}>Download PDF</Button>
        <Button onClick={() => handleShareLinkedIn()}>Share on LinkedIn</Button>
        <Button onClick={() => handleShareTwitter()}>Share on Twitter</Button>
      </CardFooter>
    </Card>
  );
};
