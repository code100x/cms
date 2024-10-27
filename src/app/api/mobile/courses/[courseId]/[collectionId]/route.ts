import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { checkUserCourse } from '@/app/api/mobile/utils/courseUtil';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string; collectionId: string } },
) {
  try {
    const user = JSON.parse(request.headers.get('g') || '');
    if (!user || !user.id) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }
    const { courseId } = params;

    const userCourses = await checkUserCourse(user.id, courseId);

    if (!userCourses) {
      return NextResponse.json({ message: 'User does not have access to this collection or collection is empty' }, { status: 403 });
    }

    const collectionData = await db.content.findMany({
      where: {
        parentId: parseInt(courseId, 10),
      },
    });

    return NextResponse.json({
      message: 'Collection Data fetched successfully',
      data: collectionData,
    });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return NextResponse.json(
      { message: 'Error fetching user courses', error: (error as Error).message },
      { status: 500 },
    );
  }
}
