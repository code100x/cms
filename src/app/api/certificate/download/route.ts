import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;
  if (!user) return new NextResponse('Login required', { status: 400 });

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const courseId = searchParams.get('courseId');

  if (!courseId) return new NextResponse('No course id found', { status: 400 });

  const purchase = await db.userPurchases.findFirst({
    where: {
      userId: user.id,
      courseId: parseInt(courseId, 10),
    },
  });

  if (!purchase) return new NextResponse('No Purchase found', { status: 400 });
  let certificate = await db.certificate.findFirst({
    where: {
      userId: user.id,
      courseId: parseInt(courseId, 10),
    },
  });
  if (!certificate) {
    certificate = await db.certificate.create({
      data: {
        userId: user.id,
        courseId: parseInt(courseId, 10),
      },
    });
  }

  const certificateId = certificate.id;
  const userName = session.user.name;

  try {
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

    const textList = [
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
        text: 'Verify at: https://app.100xdevs.com/verify',
        fontSize: 20,
        offsetY: -530,
      },
    ];

    for (const { text, fontSize, offsetY } of textList) {
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

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="certificate.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return new NextResponse(null, { status: 500 });
  }
}
