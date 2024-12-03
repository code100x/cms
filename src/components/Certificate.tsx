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
import { FaFileImage, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useGenerateCertificate } from '@/hooks/useCertGen';
import { OneCertificate } from '@/utiles/certificate';
import { useMemo, useState, useEffect } from 'react';

export const CertificateComponent = ({
  certificateId,
  certificateSlug,
  course,
  userName,
}: OneCertificate & { userName: string }) => {
  const [loading, setLoading] = useState(true);

  const certificateDetails = useMemo(
    () => ({
      certificateId,
      course,
      userName,
      certificateSlug,
    }),
    [certificateId, course, userName, certificateSlug],
  );

  const { certificateImageUrl } = useGenerateCertificate({
    certificateDetails,
    userName,
  });

  useEffect(() => {
    if (certificateImageUrl) {
      setLoading(false);
    }
  }, [certificateImageUrl]);

  const handleDownloadPNG = async () => {
    if (loading) return;
    setLoading(true);
    const downloadUrl = certificateImageUrl;
    console.log('downloadUrl is : ', downloadUrl);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'certificate.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoading(false);
  };

  const handleShareLinkedIn = async () => {
    if (loading) return;
    setLoading(true);
    const certificateUrl = `${window.location.origin}/certificate/verify/${certificateSlug}`;
    const postContent = `I just earned the "${course.title}" certificate on 100xDevs! Check it out: ${certificateUrl}`;
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      certificateUrl,
    )}&text=${encodeURIComponent(postContent)}`;
    window.open(shareUrl);
    setLoading(false);
  };

  const handleShareTwitter = () => {
    if (loading) return;
    setLoading(true);
    const tweetText = `I just earned the "${course.title}" certificate on 100xDevs! Check it out:`;
    const certificateUrl = `${window.location.origin}/certificate/verify/${certificateSlug}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(certificateUrl)}`;
    window.open(shareUrl);
    setLoading(false);
  };

  return (
    <Card className="w-500 my-4 pt-8" key={course.id}>
      <CardContent className="flex justify-center">
        {certificateImageUrl ? (
          <img
            src={certificateImageUrl}
            alt="Certificate"
            className="w-full max-w-screen-md"
          />
        ) : (
          <div className="mt-5 text-2xl font-semibold leading-none tracking-tight">
            Generating certificate...
          </div>
        )}
      </CardContent>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button onClick={handleDownloadPNG} className="mr-2" disabled={loading}>
          <FaFileImage className="mr-1" /> Download PNG
        </Button>
        <div className="flex items-center justify-center">
          <Button
            className="share-button mr-2 flex items-center"
            onClick={handleShareLinkedIn}
            disabled={loading}
          >
            <FaLinkedin className="mr-1" /> Share on LinkedIn
          </Button>
          <Button
            onClick={handleShareTwitter}
            className="mr-2"
            disabled={loading}
          >
            <FaTwitter className="mr-1" /> Share on Twitter
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
