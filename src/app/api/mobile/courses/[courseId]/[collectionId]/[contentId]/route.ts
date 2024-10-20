import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

async function checkUserContentAccess(userId: string, contentId: string) {
  const userContent = await db.content.findFirst({
    where: {
      id: parseInt(contentId, 10),
      courses: {
        some: {
          course: {
            purchasedBy: {
              some: {
                userId: userId,
              },
            },
          },
        },
      },
    },
  });
  return userContent !== null;
}

export async function GET(req : NextRequest,{ params }: { params: { contentId: string } }) {
  try {
    const { contentId } = params;
    const user = JSON.parse(req.headers.get('g') || '');
    const userContentAccess = await checkUserContentAccess(user.id, contentId);
    if (!userContentAccess) {
      return NextResponse.json({ message: 'User does not have access to this content' }, { status: 403 });
    }
    const contents = await db.content.findUnique({
      where: {
        id: parseInt(contentId, 10),
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
