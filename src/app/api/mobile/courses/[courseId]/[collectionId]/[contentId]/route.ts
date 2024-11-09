import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

async function checkUserContentAccess(
  userId: string,
  collectionId: string,
  courseId: string,
) {
  const purchasedUsers = await db.course.findFirst({
    where: {
      id: parseInt(courseId, 10),
      purchasedBy: {
        some: {
          userId,
        },
      },
    },
  });
  console.log('purchasedUsers: ', purchasedUsers);

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
  console.log('checkCourse: ', checkCourse);

  if (!checkCourse) {
    return false;
  }

  return purchasedUsers !== null;
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
