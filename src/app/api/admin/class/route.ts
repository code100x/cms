import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    title,
    description,
    date,
    startTime,
    endTime,
    meetingLink,
    adminSecret,
    course: courseTitle
  } = body;
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
    const res = await db.class.create({
      data: {
        courseId: course.id,
        title,
        description,
        date,
        startTime,
        endTime,
        meetingLink,
      },
    });
    console.log(res);
    return NextResponse.json({ status: 200, data: res });  
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal server error"});
  }
}
