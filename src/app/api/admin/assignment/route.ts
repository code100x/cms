import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, course: courseTitle, dueDate, dueTime, adminSecret } = body;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 403 });
  }

  try {
    const course = await db.course.findFirst({
      where: {
        title: courseTitle
      },
      select: {
        id: true
      }
    });

    if (!course) {
      return NextResponse.json({status: 404, error: "No course found"});
    }

    const res = await db.assignment.create({
      data: {
        title,
        description,
        courseId: course.id,
        dueDate,
        dueTime,
      },
    });

    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
}
