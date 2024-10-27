import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { checkUserCourse } from '@/app/api/mobile/utils/courseUtil';

export async function GET(
  req: NextRequest,
  { params }: { params: {courseId:string; collectionId:string; contentId: string } },
) {
  try {
    const {courseId, contentId } = params;
    const user = JSON.parse(req.headers.get('g') || '');
    const userContentAccess = await checkUserCourse(user.id, courseId);
    if (!userContentAccess) {
      return NextResponse.json(
        { message: 'User does not have access to this content' },
        { status: 403 },
      );
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
