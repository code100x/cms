import { createCanvas, loadImage } from 'canvas';

export const getTextProperties = (certificateId: string, userName: string) => {
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
      text: `Verify at: https://app.100xdevs.com/certificate/verify/${certificateId}`,
      fontSize: 20,
      offsetY: -530,
    },
  ];
};
export const generatePng = async (certificateId: string, userName: string) => {
  const textProperties = getTextProperties(certificateId, userName);

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
