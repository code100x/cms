import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { getExtraCourses } from '../../route';

async function checkUserCollectionAccess(
  userId: string,
  collectionId: string,
  courseId: string,
) {
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

  // If not directly purchased, check if user has access through extra courses logic
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
  { params }: { params: { collectionId: string; courseId: string } },
) {
  try {
    const user = JSON.parse(request.headers.get('g') || '');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const { collectionId, courseId } = params;
    const userHasCollectionAccess = await checkUserCollectionAccess(
      user.id,
      collectionId,
      courseId,
    );
    if (!userHasCollectionAccess) {
      return NextResponse.json(
        { message: 'User does not have access to this collection' },
        { status: 403 },
      );
    }
    const collectionData = await db.content.findMany({
      where: {
        parentId: parseInt(collectionId, 10),
      },
    });

    if (!collectionData) {
      return NextResponse.json(
        { message: 'Collection not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: 'Collection Data fetched successfully',
      data: collectionData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching user courses', error },
      { status: 500 },
    );
  }
}
