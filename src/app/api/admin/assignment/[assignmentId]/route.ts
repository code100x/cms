import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { assignmentId: string } },
) {
  const body = await req.json();
  const assignmentId = parseInt(params.assignmentId, 10);
  const {
    title,
    description,
    course: courseTitle,
    dueDate,
    dueTime,
    adminSecret,
  } = body;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 403 });
  }
  try {
    const courseId = await db.course.findFirst({
      where: {
        title: courseTitle,
      },
      select: {
        id: true,
      },
    });

    if (!courseId) {
      return NextResponse.json({ status: 404, error: 'No course found' });
    }

    const res = await db.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        title,
        description,
        courseId: courseId.id,
        dueDate,
        dueTime,
      },
    });

    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
}
