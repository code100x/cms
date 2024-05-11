'use client';

import { createCertificate } from '@/actions/certificate/createCertificate';
import { getUserCert } from '@/actions/certificate/getUserCert';
import { checkCoursePurchased } from '@/actions/purchases/checkCoursePurchased';
import { useSession } from 'next-auth/react';
import { PDFDocument, rgb } from 'pdf-lib';
import { useEffect, useState } from 'react';

const getTextProperties = (certificateId: string, userName: string) => {
  const hostname = window.location.hostname;
  return [
    { text: 'CERTIFICATE', fontSize: 80, offsetY: 450 },
    { text: 'OF COMPLETION', fontSize: 35, offsetY: 400 },
    {
      text: 'This certificate is proudly presented to',
      fontSize: 30,
      offsetY: 100,
    },
    { text: userName, fontSize: 65, offsetY: 0 },
    {
      text: "For Successfully Completing the '0-1' cohort offered by 100xdevs",
      fontSize: 30,
      offsetY: -100,
    },
    { text: 'HARKIRAT SINGH', fontSize: 30, offsetY: -400 },
    { text: 'Instructor', fontSize: 25, offsetY: -450 },
    { text: `Certificate id: ${certificateId}`, fontSize: 20, offsetY: -500 },
    {
      text: `Verify at: https://${hostname}/certificate/verify/${certificateId}`,
      fontSize: 20,
      offsetY: -530,
    },
  ];
};

export function useCertPdf(certificateId?: string, courseId?: string) {
  const { status, data: session } = useSession();
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [pdfClicked, setPdfClicked] = useState(false);
  const [certImage] = useState<HTMLImageElement>(new Image());
  const [signImage] = useState<HTMLImageElement>(new Image());
  const [generatingPdf, setGeneratingPdf] = useState(false);
  useEffect(() => {
    if (!certImage.src) {
      certImage.src = '/certiTemplate.png';
    }
    if (!signImage.src) {
      signImage.src = '/sign.png';
    }
    async function generatePdfData() {
      setGeneratingPdf(true);
      if (certificateId) {
        const certificate = await getUserCert(certificateId);

        if (!certificate) {
          console.error('No Certificate found , Enter valid CertificateId');
        } else {
          const data = await generatePdf(
            certificateId,
            session?.user?.name || '',
            certImage,
            signImage,
          );
          setPdfData(data.pdfDataUri);
        }
      } else if (courseId) {
        if (status === 'authenticated') {
          //check if the user has purchased this courseId
          const isCoursePurchased = await checkCoursePurchased(courseId);
          if (isCoursePurchased) {
            // create a new Cert in the D.B
            const { message, newCert } = await createCertificate(courseId);
            if (newCert) {
              const data = await generatePdf(
                newCert.id,
                session.user?.name || '',
                certImage,
                signImage,
              );
              setPdfData(data.pdfDataUri);
            } else {
              console.error(message);
            }
          } else {
            console.error('Cannot find the course');
          }
        }
      } else {
        console.error('Give Either CertificateId or CourseId');
      }
      setGeneratingPdf(false);
    }
    if (pdfClicked) {
      generatePdfData();
    }
  }, [pdfClicked]);

  return { pdfData, setPdfClicked, generatingPdf };
}

const generatePdf = async (
  certificateId: string,
  userName: string,
  certImage: HTMLImageElement,
  signImage: HTMLImageElement,
) => {
  const textProperties = getTextProperties(certificateId, userName);

  const certData = getBase64String(
    certImage,
    certImage.width,
    certImage.height,
  );
  const signData = getBase64String(
    signImage,
    signImage.width,
    signImage.height,
  );

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([2000, 1545]);

  const image = await pdfDoc.embedPng(certData);

  const { width: imgWidth, height: imgHeight } = image.scaleToFit(
    page.getWidth(),
    page.getHeight(),
  );
  page.drawImage(image, {
    x: page.getWidth() / 2 - imgWidth / 2,
    y: page.getHeight() / 2 - imgHeight / 2,
    width: imgWidth,
    height: imgHeight,
  });
  const font = await pdfDoc.embedFont('Times-Roman');
  for (const { text, fontSize, offsetY } of textProperties) {
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textX = (page.getWidth() - textWidth) / 2;
    const textY = page.getHeight() / 2 + offsetY;
    page.drawText(text, {
      x: textX,
      y: textY,
      size: fontSize,
      color: rgb(0, 0, 0),
      font,
    });
  }

  const sign = await pdfDoc.embedPng(signData);
  const { width: signWidth, height: signHeight } = sign.scaleToFit(
    page.getWidth() * 0.5,
    page.getHeight() * 0.1,
  );
  page.drawImage(sign, {
    x: page.getWidth() / 2 - signWidth / 2,
    y: page.getHeight() / 2 - 350,
    width: signWidth,
    height: signHeight,
  });

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  return { pdfDataUri };
};

export function useCertPng(certificateId?: string, courseId?: string) {
  const { status, data: session } = useSession();
  const [imgUri, setImgUri] = useState<string | null>(null);
  const [imgClicked, setImgClicked] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  useEffect(() => {
    async function generateImgData() {
      setGeneratingImg(true);
      if (certificateId) {
        const certificate = await getUserCert(certificateId);

        if (!certificate) {
          console.error('No Certificate found , Enter valid CertificateId');
        } else {
          const data = await generateImg(
            session?.user?.name || '',
            certificateId,
          );
          setImgUri(data);
        }
      } else if (courseId) {
        if (status === 'authenticated') {
          //check if the user has purchased this courseId
          const isCoursePurchased = await checkCoursePurchased(courseId);
          if (isCoursePurchased) {
            // create a new Cert in the D.B
            const { message, newCert } = await createCertificate(courseId);
            if (newCert) {
              const data = await generateImg(
                session?.user?.name || '',
                newCert.id,
              );
              setImgUri(data);
            } else {
              console.error(message);
            }
          } else {
            console.error('Cannot find the course');
          }
        }
      } else {
        console.error('Give Either CertificateId or CourseId');
      }
      setGeneratingImg(false);
    }
    if (imgClicked) {
      generateImgData();
    }
  }, [imgClicked]);
  return { imgUri, setImgClicked, generatingImg };
}

const generateImg = async (
  userName: string,
  certificateId: string,
): Promise<string> => {
  return new Promise((res, rej) => {
    const offscreenCanvas = document.createElement('canvas');
    const ctx = offscreenCanvas.getContext('2d');

    const certificateImage = new Image();
    certificateImage.src = '/certiTemplate.png';

    const signImage = new Image();
    signImage.src = '/sign.png';

    certificateImage.onload = () => {
      // Set the off-screen canvas dimensions to match the loaded image
      offscreenCanvas.width = certificateImage.width;
      offscreenCanvas.height = certificateImage.height;

      if (ctx) {
        ctx.drawImage(
          certificateImage,
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height,
        );
        const textProperties = getTextProperties(certificateId, userName);

        //Fill Certificate Contents
        for (let i = 0; i < textProperties.length; i++) {
          const { text, fontSize, offsetY } = textProperties[i];
          ctx.font = `${fontSize}px Times Roman`;
          if (i === 0 || text === userName) {
            ctx.font = `bold ${fontSize}px Times Roman`;
          }
          const textWidth = ctx.measureText(`${text}`).width;
          const textX = (offscreenCanvas.width - textWidth) / 2;
          const textY = offscreenCanvas.height / 2 - offsetY;
          ctx.fillText(`${text}`, textX, textY);
        }
        //Fill sign
        const signWidth = offscreenCanvas.width / 2 - signImage.width / 2;
        const signHeight = offscreenCanvas.height / 2 + 180;
        ctx.drawImage(signImage, signWidth, signHeight);

        const dataUrl = offscreenCanvas.toDataURL();
        res(dataUrl);
      } else {
        rej('Error creating off-screen canvas context');
      }
    };

    certificateImage.onerror = () => {
      rej('Error loading certificate image');
    };
  });
};

export const getBase64String = (image: any, width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, 0, 0);

  const base64String = canvas.toDataURL('image/png');
  return base64String;
};
