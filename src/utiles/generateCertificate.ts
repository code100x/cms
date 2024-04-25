/* eslint-disable @typescript-eslint/no-unused-vars */
// src/utiles/generateCertificate.ts
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

interface CertificateData {
  userId: string;
  userName: string;
  courseId: number;
  courseTitle: string;
  certificateId: string;
}

export async function generateCertificate(data: CertificateData) {
  try {
    const assetsPath = path.join(process.cwd(), 'src', 'assets');
    const [imageData, signData] = await Promise.all([
      fs.promises.readFile(path.join(assetsPath, 'certitemplate.png')),
      fs.promises.readFile(path.join(assetsPath, 'sign.png')),
    ]);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // Standard A4 size

    const image = await pdfDoc.embedPng(imageData);
    const imgScale = image.scaleToFit(page.getWidth(), page.getHeight());
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: imgScale.width,
      height: imgScale.height,
    });

    const font = await pdfDoc.embedFont(PDFDocument.Font.HelveticaBold); // we can change any file here

    const textList = [
      { text: 'CERTIFICATE OF COMPLETION', fontSize: 24, offsetY: 700 },
      {
        text: `This is to certify that ${data.userName}`,
        fontSize: 18,
        offsetY: 680,
      },
      {
        text: `has completed the course ${data.courseTitle}`,
        fontSize: 18,
        offsetY: 660,
      },
      {
        text: `Certificate ID: ${data.certificateId}`,
        fontSize: 16,
        offsetY: 640,
      },
      { text: `Date:${new Date().toDateString()}`, fontSize: 16, offsetY: 620 },
    ];

    textList.forEach(({ text, fontSize, offsetY }) => {
      page.drawText(text, {
        x: 50,
        y: offsetY,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
    const certificatePath = path.join(
      process.cwd(),
      'public',
      'certificates',
      `${data.certificateId}.pdf`,
    );
    await fs.promises.writeFile(certificatePath, pdfBytes);

    return `/certificates/${data.certificateId}.pdf`;
  } catch (error) {
    console.error('Error generating certificate:', error);
    return null;
  }
}
