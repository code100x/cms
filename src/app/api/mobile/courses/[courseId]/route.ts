import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';
import { getExtraCourses } from '../route';

async function checkUserCourseAccess(userId: string, courseId: string) {
  // First check if user has directly purchased the course
  const purchasedCourse = await db.course.findFirst({
    where: {
      id: parseInt(courseId, 10),
      purchasedBy: {
        some: {
          userId,
        },
      },
    },
  });

  if (purchasedCourse) {
    return true;
  }

  // If not directly purchased, check if user has access through the extra courses logic
  const purchasedCourses = await db.course.findMany({
    where: {
      purchasedBy: {
        some: {
          userId,
        },
      },
    },
  });

  const allCourses = await db.course.findMany();
  const extraCourses = getExtraCourses(purchasedCourses, allCourses);

  // Check if the requested course is in the extra courses
  const hasAccess = extraCourses.some(
    (course) => course.id === parseInt(courseId, 10),
  );

  return hasAccess;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const user: { id: string; email: string } = JSON.parse(
      request.headers.get('g') || '',
    );
    const { courseId } = params;

    if (!user) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 400 });
    }

    const userCourseAccess = await checkUserCourseAccess(user.id, courseId);
    if (!userCourseAccess) {
      return NextResponse.json(
        { message: 'User does not have access to this course' },
        { status: 403 },
      );
    }

    const courseData = await db.content.findMany({
      where: {
        id: parseInt(courseId, 10),
      },
    });

    if (!courseData) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: 'Course data fetched successfully',
      data: courseData,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { message: 'Error fetching course data', error },
      { status: 500 },
    );
  }
}
