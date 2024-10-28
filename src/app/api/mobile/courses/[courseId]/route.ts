import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';

async function checkUserCourseAccess(user: any, courseId: string) {
  const userCourse = await db.course.findFirst({
    where: {
      purchasedBy: {
        some: {
          user: {
            email: user.email,
          },
        },
      },
      id: parseInt(courseId, 10),
    },
  });

  return userCourse !== null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = JSON.parse(request.headers.get('g') || '');
    const { courseId } = params;

    const userCourseAccess = await checkUserCourseAccess(user, courseId);
    if (!userCourseAccess) {
      return NextResponse.json(
        { message: 'User does not have access to this course' },
        { status: 403 },
      );
    }
    const folderContents = await db.content.findMany({
      where: {
        courses: {
          some: {
            courseId: parseInt(courseId, 10),
          },
        },
        type: 'folder',
      },
    });

    return NextResponse.json({
      message: 'Courses Data fetched successfully',
      data: folderContents,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching user courses', error },
      { status: 500 },
    );
  }
}
