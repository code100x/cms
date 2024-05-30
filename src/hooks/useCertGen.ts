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
      const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      const fontSize = 32;
      const textWidth = timesRoman.widthOfTextAtSize(userName, fontSize);
      const xRecipient = (width - textWidth) / 2;
      const yRecipient = height * 0.46;
      firstPage.drawText(capitalizeFirstLetter(userName), {
        x: xRecipient,
        y: yRecipient,
        size: fontSize,
        font: timesRoman,
        color: rgb(0, 0, 0),
      });

      const certificateNumberFontSize = 14;
      firstPage.drawText(
        `Certificate No: ${certificateDetails.certificateSlug}`,
        {
          x: width * 0.6,
          y: height * 0.25,
          size: certificateNumberFontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        },
      );

      const certificatDescriptionText = `has successfully completed ${certificateDetails.course.title} Full Stack Web Development Course`;
      const certificatDescription = 12;
      const descriptionTextWidth = helveticaFont.widthOfTextAtSize(
        certificatDescriptionText,
        certificatDescription,
      );
      firstPage.drawText(certificatDescriptionText, {
        x: (width - descriptionTextWidth) / 2,
        y: height * 0.4,
        size: certificatDescription,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      const downloadDateText = ` ${new Date().toLocaleDateString()}`;
      firstPage.drawText(downloadDateText, {
        x: width * 0.2 + 5,
        y: height * 0.1 - 11,
        size: certificateNumberFontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

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

      ctx.font = '85px "Brush Script MT", cursive'; // Changed to  font
      ctx.fillStyle = 'black';
      const textWidth = ctx.measureText(recipientName).width;
      const xRecipient = (offscreenCanvas.width - textWidth) / 2;
      const yRecipient = offscreenCanvas.height * 0.54;
      ctx.fillText(recipientName, xRecipient, yRecipient);

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
