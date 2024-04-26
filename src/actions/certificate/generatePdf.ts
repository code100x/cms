import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

import { getTextProperties } from './generatePng';
export const generatePdf = async (certificateId: string, userName: string) => {
  const textProperties = getTextProperties(certificateId, userName);

  const [imageData, signData] = await Promise.all([
    fs.promises.readFile('src/app/api/certificate/certitemplate.png'),
    fs.promises.readFile('src/app/api/certificate/sign.png'),
  ]);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([2000, 1545]);

  const image = await pdfDoc.embedPng(imageData);
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

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
