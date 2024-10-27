import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';
import { checkUserCourse } from '@/app/api/mobile/utils/courseUtil';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const user: { id: string } = JSON.parse(request.headers.get('g') || '');
    const { courseId } = params;

    const userCourseAccess = await checkUserCourse(user.id, courseId);
    if (!userCourseAccess) {
      return NextResponse.json(
        { message: 'User does not have access to this course' },
        { status: 403 },
      );
    }
    const folderContents = await db.content.findMany({
      where: {
        id: parseInt(courseId, 10),
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
