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
  const [downloadDate, setDownloadDate] = useState<Date | null>(null);

  useEffect(() => {
    async function generateCertificateAndImage() {
      setGenerating(true);

      try {
        await generateCertificate();
        await generateCertificateImage();
        setDownloadDate(new Date());
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
      const timesRomanBoldFont = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold,
      );

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      const fontSize = 30;
      const textWidth = timesRomanBoldFont.widthOfTextAtSize(
        userName,
        fontSize,
      );
      const xRecipient = (width - textWidth) / 2;
      const yRecipient = height * 0.46;
      firstPage.drawText(capitalizeFirstLetter(userName), {
        x: xRecipient,
        y: yRecipient,
        size: fontSize,
        font: timesRomanBoldFont,
        color: rgb(0, 0, 0),
      });

      const certificateNumberFontSize = 28;
      firstPage.drawText(
        `Certificate No:${certificateDetails.certificateSlug}`,
        {
          x: width * 0.3,
          y: height * 0.12,
          size: certificateNumberFontSize,
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

      ctx.font = '85px "Brush Script MT", cursive '; // Changed to  font
      ctx.fillStyle = 'black';
      const textWidth = ctx.measureText(recipientName).width;
      const xRecipient = (offscreenCanvas.width - textWidth) / 2;
      const yRecipient = offscreenCanvas.height * 0.54;
      ctx.fillText(recipientName, xRecipient, yRecipient);

      const certificatDescription = 35;
      ctx.font = `${certificatDescription}px Helvetica`;
      const certificatDescriptionText = `for successfully completing the ${certificateDetails.course.title} Full Stack Web Development Course`;

      const descriptionWidth = ctx.measureText(certificatDescriptionText).width;
      const xDescription = (offscreenCanvas.width - descriptionWidth) / 2;
      const yDescription = offscreenCanvas.height * 0.62;

      ctx.fillText(certificatDescriptionText, xDescription, yDescription);

      const certificateNumberFontSize = 35;
      ctx.font = `${certificateNumberFontSize}px Helvetica`;
      const certificateNumberText = `Certificate No: ${certificateDetails.certificateSlug}`;
      ctx.fillText(
        certificateNumberText,
        offscreenCanvas.width * 0.35 + 510,
        offscreenCanvas.height * 0.77,
      );

      // Add download date
      const downloadDateText = ` ${new Date().toLocaleDateString()}`;
      ctx.font = `${certificateNumberFontSize / 1}px Helvetica`;
      ctx.fillText(
        downloadDateText,
        offscreenCanvas.width * 0.18 + 20,
        offscreenCanvas.height * 0.94,
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
    downloadDate,
  };
}
