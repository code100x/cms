import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

async function checkUserCollectionAccess(
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
  return purchasedUsers !== null;
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
