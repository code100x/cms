import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Assuming this is the correct import for authOptions
import db from '@/db';
import { generateCertificate } from '@/utiles/generateCertificate';

export async function POST(req: NextRequest) {
  const session = await getServerSession(req, authOptions);
  const user = session?.user;

  if (!user) return new NextResponse('Login required', { status: 401 });

  const { courseId } = await req.json();

  const course = await db.course.findUnique({
    where: { id: parseInt(courseId, 10) },
  });

  if (!course) return new NextResponse('Course not found', { status: 400 });

  let certificate = await db.certificate.findUnique({
    where: {
      userId_courseId: { userId: user.id, courseId: parseInt(courseId, 10) },
    },
  });

  if (!certificate) {
    const newCertificate = await db.certificate.create({
      data: { userId: user.id, courseId: parseInt(courseId, 10) },
    });
    certificate = newCertificate;
  }

  const certificateUrl = await generateCertificate({
    userId: user.id,
    userName: user.name || '',
    courseId: parseInt(courseId, 10),
    courseTitle: course.title,
    certificateId: certificate.id,
  });

  if (certificateUrl) {
    await db.certificate.update({
      where: { id: certificate.id },
      data: { certificateUrl },
    });
  }

  return new NextResponse('Certificate generated successfully', {
    status: 200,
  });
}
