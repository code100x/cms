import { createCanvas, loadImage } from 'canvas';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

const getTextProperties = (
  certificateId: string,
  userName: string,
  hostname: string,
) => {
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
      text: `Verify at: http://${hostname}/certificate/verify/${certificateId}`,
      fontSize: 20,
      offsetY: -530,
    },
  ];
};
export const generatePng = async (
  certificateId: string,
  userName: string,
  hostname: string,
) => {
  const textProperties = getTextProperties(certificateId, userName, hostname);

  const certiTemplate = await loadImage(
    'src/app/api/certificate/certitemplate.png',
  );
  const canvas = createCanvas(certiTemplate.width, certiTemplate.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(certiTemplate, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';

  for (const { text, fontSize, offsetY } of textProperties) {
    ctx.font = `${fontSize}px "Times New Roman"`;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - offsetY);
  }

  const sign = await loadImage('src/app/api/certificate/sign.png');

  ctx.drawImage(
    sign,
    canvas.width / 2 - sign.width / 2,
    canvas.height / 2 + 350 - sign.height,
  );

  const buffer = canvas.toBuffer('image/png');
  return buffer;
};

export const generatePdf = async (
  certificateId: string,
  userName: string,
  hostname: string,
) => {
  const textProperties = getTextProperties(certificateId, userName, hostname);

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
