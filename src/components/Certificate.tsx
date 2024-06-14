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

type ActionType = 'downloadPNG' | 'shareLinkedIn' | 'shareTwitter';

export const CertificateComponent = ({
  certificateId,
  certificateSlug,
  course,
  userName,
}: OneCertificate & { userName: string }) => {
  const [triggeredAction, setTriggeredAction] = useState<ActionType | null>(
    null,
  );

  const certificateDetails = useMemo(
    () => ({
      certificateId,
      course,
      userName,
      certificateSlug,
    }),
    [certificateId, course, userName, certificateSlug],
  );

  const { certificatePdfUrl, certificateImageUrl } = useGenerateCertificate({
    certificateDetails,
    userName,
  });

  useEffect(() => {
    if (!certificateImageUrl || !triggeredAction) return;

    console.log('Url is : ', certificatePdfUrl);
    switch (triggeredAction) {
      case 'downloadPNG': {
        const downloadUrl = certificateImageUrl;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'certificate.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        break;
      }
      case 'shareLinkedIn': {
        const certificateUrl = `${window.location.origin}/certificate/verify/${certificateSlug}`;
        const postContent = `I just earned the "${course.title}" certificate on 100xDevs! Check it out: ${certificateUrl}`;
        const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          certificateUrl,
        )}&text=${encodeURIComponent(postContent)}`;
        window.open(linkedInShareUrl);
        break;
      }
      case 'shareTwitter': {
        const tweetText = `I just earned the "${course.title}" certificate on 100xDevs! Check it out:`;
        const twitterShareUrl = `${window.location.origin}/certificate/verify/${certificateSlug}`;
        const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(twitterShareUrl)}`;
        window.open(twitterShareLink);
        break;
      }
      default: {
        break;
      }
    }

    setTriggeredAction(null);
  }, [certificateImageUrl, triggeredAction, certificateSlug, course.title]);

  const handleAction = (action: ActionType) => {
    setTriggeredAction(action);
  };

  return (
    <Card className="w-500 my-4" key={course.id}>
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
        <Button onClick={() => handleAction('downloadPNG')} className="mr-2">
          <FaFileImage className="mr-1" /> Download PNG
        </Button>
        <div className="flex items-center justify-center">
          <Button
            className="share-button mr-2 flex items-center"
            onClick={() => handleAction('shareLinkedIn')}
          >
            <FaLinkedin className="mr-1" /> Share on LinkedIn
          </Button>
          <Button onClick={() => handleAction('shareTwitter')} className="mr-2">
            <FaTwitter className="mr-1" /> Share on Twitter
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
