import { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { OneCertificate } from '@/utiles/certificate';

function capitalizeFirstLetter(inputString: string): string {
  if (inputString.length === 0) {
    return inputString;
  }
  return inputString[0].toUpperCase() + inputString.slice(1);
}

type GenerateCertificateProps = {
  certificateDetails: OneCertificate;
  userName: string;
};

export function useGenerateCertificate({
  certificateDetails,
  userName,
}: GenerateCertificateProps) {
  const [generating, setGenerating] = useState(false);
  const [certificatePdfUrl, setCertificatePdfUrl] = useState<string | null>(
    null,
  );
  const [certificateImageUrl, setCertificateImageUrl] = useState('');

  useEffect(() => {
    async function generateCertificateAndImage() {
      setGenerating(true);

      try {
        await generateCertificate();
        await generateCertificateImage();
      } catch (error) {
        console.error(error);
      } finally {
        setGenerating(false);
      }
    }

    generateCertificateAndImage();
  }, [certificateDetails]);

  async function generateCertificate() {
    try {
      const existingPdfBytes = await fetch('/certificate.pdf').then((res) =>
        res.arrayBuffer(),
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      const CourierBoldOblique = await pdfDoc.embedFont(
        StandardFonts.CourierBoldOblique,
      );
      const timesRomanBoldFont = await pdfDoc.embedFont(
        StandardFonts.TimesRomanBold,
      );

      const fontSize = 65;
      const textWidth = CourierBoldOblique.widthOfTextAtSize(
        userName,
        fontSize,
      );
      const xRecipient = (width - textWidth) / 2;
      const yRecipient = height * 0.43;
      firstPage.drawText(capitalizeFirstLetter(userName), {
        x: xRecipient,
        y: yRecipient,
        size: fontSize,
        font: CourierBoldOblique,
        opacity: 0.85,
        color: rgb(0, 0, 0),
      });

      const certificateNumberFontSize = 28;
      firstPage.drawText(
        `Certificate No:${certificateDetails.certificateSlug}`,
        {
          x: width * 0.6259,
          y: height * 0.1997,
          size: certificateNumberFontSize,
          font: timesRomanBoldFont,
          color: rgb(0, 0, 0),
        },
      );

      const completedAtDateFontSize = 25;
      firstPage.drawText(
        `${certificateDetails.completedAt.toLocaleDateString('en-IN')}`,
        {
          x: width * 0.189,
          y: height * 0.034,
          size: completedAtDateFontSize,
          font: timesRomanBoldFont,
          color: rgb(0, 0, 0),
        },
      );
      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      setCertificatePdfUrl(pdfDataUri);
    } catch (error) {
      console.error(error);
    }
  }

  const generateCertificateImage = async (): Promise<void> => {
    try {
      const offscreenCanvas = document.createElement('canvas');
      const ctx = offscreenCanvas.getContext('2d');

      const certificateImage = new Image();
      certificateImage.src = '/certificate.png';

      await new Promise((resolve, reject) => {
        certificateImage.onload = resolve;
        certificateImage.onerror = reject;
      });

      offscreenCanvas.width = certificateImage.width;
      offscreenCanvas.height = certificateImage.height;

      const recipientName = capitalizeFirstLetter(userName);

      if (!ctx) {
        throw new Error('Error creating off-screen canvas context');
      }

      ctx.drawImage(certificateImage, 0, 0);
      ctx.font = 'bold italic 65px Courier New';
      ctx.fillStyle = 'black';
      ctx.globalAlpha = 0.85;
      const textWidth = ctx.measureText(recipientName).width;
      const xRecipient = (offscreenCanvas.width - textWidth) / 2;
      const yRecipient = offscreenCanvas.height * 0.57;
      ctx.fillText(recipientName, xRecipient, yRecipient);

      const certificateNumberFontSize = 30;
      ctx.font = `bold ${certificateNumberFontSize}px Helvetica`;
      const certificateNumberText = `Certificate No: ${certificateDetails.certificateSlug}`;
      ctx.fillText(
        certificateNumberText,
        offscreenCanvas.width * 0.61,
        offscreenCanvas.height * 0.8,
      );

      const completedAtDateFontSize = 25;
      ctx.font = `bold ${completedAtDateFontSize}px Helvetica`;
      const completedAtDateText = `${certificateDetails.completedAt.toLocaleDateString('en-IN')}`;
      ctx.fillText(
        completedAtDateText,
        offscreenCanvas.width * 0.19,
        offscreenCanvas.height * 0.9675,
      );

      const dataUrl = offscreenCanvas.toDataURL();

      setCertificateImageUrl(dataUrl);
    } catch (error) {
      console.error('Error generating certificate image:', error);
      throw error;
    }
  };

  return {
    generating,
    certificatePdfUrl,
    certificateImageUrl,
  };
}
