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
import { FaDownload, FaFileImage, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useCertPdf, useCertPng } from '@/hooks/useCert';

import { useEffect } from 'react';

export const CertificateComponent = ({ course, certificateId }: any) => {
  //calls the useCertPdf and useCertPng and passes certificateId and course.id gets the pdfData and ImageData

  const { pdfData, setPdfClicked, generatingPdf } = useCertPdf(
    certificateId,
    course.id,
  );
  const { imgUri, setImgClicked, generatingImg } = useCertPng(
    certificateId,
    course.id,
  );
  useEffect(() => {
    if (pdfData) {
      const a = document.createElement('a');
      a.download = 'certificate.pdf';
      a.href = pdfData;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [pdfData]);

  useEffect(() => {
    if (imgUri) {
      const imgBlob = getImgBlob(imgUri);
      const downloadImgUri = URL.createObjectURL(imgBlob);
      window.open(downloadImgUri);
      const a = document.createElement('a');
      a.download = 'certificate.png';
      a.href = downloadImgUri;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadImgUri);
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

  const handleDownloadPDF = async () => {
    setPdfClicked(true);
  };

  const handleDownloadPNG = async () => {
    setImgClicked(true);
  };

  const handleShareLinkedIn = async () => {
    const certificateUrl = `${window.location.origin}/certificate/verify/${certificateId}`;
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url="${certificateUrl}"`;
    window.open(shareUrl);
  };

  const handleShareTwitter = () => {
    const tweetText = `I just earned the "${course.title}" certificate on 100x Academy! Check it out:`;
    const certificateUrl = `${window.location.origin}/certificate/verify/${certificateId}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText,
    )}&url=${encodeURIComponent(certificateUrl)}`;
    window.open(shareUrl);
  };

  return (
    <Card className="w-500 my-4" key={course.id}>
      <CardContent className="flex justify-center">
        <img src={course.imageUrl} alt="" width={500} />
      </CardContent>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button
          disabled={generatingPdf}
          onClick={() => handleDownloadPDF()}
          className="mr-2"
        >
          <FaDownload className="mr-1" />
          Download PDF
        </Button>
        <Button
          disabled={generatingImg}
          onClick={() => handleDownloadPNG()}
          className="mr-2"
        >
          <FaFileImage className="mr-1" />
          Download PNG
        </Button>
        <div className="flex items-center justify-center">
          <Button
            className="share-button flex items-center mr-2 bg-transparent"
            onClick={handleShareLinkedIn}
          >
            <FaLinkedin className="mr-1" />
            Share on LinkedIn
          </Button>
          <Button onClick={handleShareTwitter} className="mr-2">
            <FaTwitter className="mr-1" />
            Share on Twitter
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
