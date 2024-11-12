import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { classId: string } },
) {
  const body = await req.json();
  const classId = parseInt(params.classId, 10);
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    meetingLink,
    adminSecret,
    course: courseTitle,
  } = body;
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 403 });
  }

  try {
    const course = await db.course.findFirst({
      where: {
        title: courseTitle,
      },
      select: {
        id: true,
      },
    });

    if (!course) {
      return NextResponse.json({ status: 404, error: 'No course found' });
    }

    const classResult = await db.class.findUnique({
      where: {
        id: classId,
      },
    });

    if (!classResult) {
      return NextResponse.json({ stauts: 404, error: 'No class found' });
    }

    const res = await db.class.update({
      where: {
        id: classResult.id,
      },
      data: {
        title,
        description,
        date,
        startTime,
        endTime,
        meetingLink,
      },
    });
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    return NextResponse.json({ status: 500, error: 'Internal server error' });
  }
}
