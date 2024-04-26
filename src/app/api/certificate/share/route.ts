import db from '@/db';
import { authOptions } from '@/lib/auth';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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

  const certiTemplate = await loadImage(
    'src/app/api/certificate/certitemplate.png',
  );

  const canvas = createCanvas(certiTemplate.width, certiTemplate.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(certiTemplate, 0, 0, canvas.width, canvas.height);

  const textProperties = [
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

  fs.writeFileSync('certificate.png', buffer);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="certificate.png"',
    },
  });
}
