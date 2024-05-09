import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/db';
import {
  generatePng,
  generatePdf,
} from '@/actions/certificate/generateCertificate';
import { headers } from 'next/headers';

export async function GET(req: NextRequest) {
  const headersList = headers();
  const hostname = headersList.get('x-forwarded-host');
  if (!hostname) return new NextResponse('No host found', { status: 400 });

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  const certId = searchParams.get('certificateId');
  if (certId) {
    const certificate = await db.certificate.findFirst({
      where: {
        id: certId,
      },
      include: {
        user: true,
      },
    });
    if (!certificate)
      return new NextResponse('Cannot find certificate', { status: 400 });
    const data = await generatePng(
      certId,
      certificate.user.name || '',
      hostname,
    );
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="certificate.png"',
      },
    });
  }

  const session = await getServerSession(authOptions);
  const user = session.user;

  const courseId = searchParams.get('courseId');
  const type = searchParams.get('type');

  if (!user) return new NextResponse('Login required', { status: 400 });
  if (!type) return new NextResponse('Type not specified', { status: 400 });
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
    if (type === 'pdf') {
      const data = await generatePdf(certificateId, userName, hostname);
      return new NextResponse(data, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="certificate.pdf"',
        },
      });
    }

    if (type === 'png') {
      const data = await generatePng(certificateId, userName, hostname);
      return new NextResponse(data, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': 'attachment; filename="certificate.png"',
        },
      });
    }
  } catch (error) {
    console.error('Error generating certificate:', error);
    return new NextResponse(null, { status: 500 });
  }
}
