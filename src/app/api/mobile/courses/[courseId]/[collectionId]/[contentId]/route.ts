import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { getExtraCourses } from '../../../route';

async function checkUserContentAccess(
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

  if (!purchasedCourse) {
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

    const hasAccess = extraCourses.some(
      (course) => course.id === parseInt(courseId, 10),
    );

    if (!hasAccess) {
      return false;
    }
  }

  // Verify that the collection belongs to the course
  const checkCourse = await db.content.findFirst({
    where: {
      id: parseInt(collectionId, 10),
      courses: {
        some: {
          courseId: parseInt(courseId, 10),
        },
      },
    },
  });

  return checkCourse !== null;
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: { params: { contentId: string; courseId: string; collectionId: string } },
) {
  try {
    const { contentId, courseId, collectionId } = params;
    const user = JSON.parse(req.headers.get('g') || '');
    const userContentAccess = await checkUserContentAccess(
      user.id,
      collectionId,
      courseId,
    );
    console.log('userContentAccess: ', userContentAccess);
    if (!userContentAccess) {
      return NextResponse.json(
        { message: 'User does not have access to this content' },
        { status: 403 },
      );
    }
    const contents = await db.content.findUnique({
      where: {
        id: parseInt(contentId, 10),
        parentId: parseInt(collectionId, 10),
      },
      select: {
        id: true,
        type: true,
        title: true,
        hidden: true,
        description: true,
        thumbnail: true,
        parentId: true,
        createdAt: true,
        notionMetadataId: true,
        commentsCount: true,
        VideoMetadata: true,
        NotionMetadata: true,
      },
    });
    if (!contents) {
      return NextResponse.json(
        {
          message: 'Content not found',
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      message: 'Content fetched successfully',
      data: contents,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching Content', error },
      { status: 500 },
    );
  }
}
