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
import { useMemo } from 'react'; //used to fix maximum update depth exceeded err

export const CertificateComponent = ({
  certificateId,
  certificateSlug,
  course,
  userName,
}: OneCertificate & { userName: string }) => {
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

  // const handleDownloadPDF = async () => {
  //   const downloadUrl = certificatePdfUrl;
  //   const a = document.createElement('a');
  //   a.href = downloadUrl!;
  //   a.download = 'certificate.pdf';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  const handleDownloadPNG = async () => {
    const downloadUrl = certificateImageUrl;
    console.log('downloadUrl is : ', downloadUrl);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'certificate.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShareLinkedIn = async () => {
    const certificateUrl = `${window.location.origin}/certificate/verify/${certificateSlug}`;
    const postContent = `I just earned the "${course.title}" certificate on 100xDevs! Check it out: ${certificateUrl}`;
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      certificateUrl,
    )}&text=${encodeURIComponent(postContent)}`;
    window.open(shareUrl);
  };

  const handleShareTwitter = () => {
    const tweetText = `I just earned the "${course.title}" certificate on 100xDevs! Check it out:`;
    const certificateUrl = `${window.location.origin}/certificate/verify/${certificateSlug}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(certificateUrl)}`;
    window.open(shareUrl);
  };

  console.log('Url is : ', certificatePdfUrl);

  return (
    <Card className="w-500 my-4" key={course.id}>
      <CardContent className="flex justify-center">
        <img
          src={certificateImageUrl}
          alt=""
          className="w-full max-w-screen-md"
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        {/* <Button onClick={() => handleDownloadPDF()} className="mr-2">
          <FaDownload className="mr-1" /> Download PDF
        </Button> */}
        <Button onClick={() => handleDownloadPNG()} className="mr-2">
          <FaFileImage className="mr-1" /> Download PNG
        </Button>
        <div className="flex items-center justify-center">
          <Button
            className="share-button mr-2 flex items-center"
            onClick={handleShareLinkedIn}
          >
            <FaLinkedin className="mr-1" /> Share on LinkedIn
          </Button>
          <Button onClick={handleShareTwitter} className="mr-2">
            <FaTwitter className="mr-1" /> Share on Twitter
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
