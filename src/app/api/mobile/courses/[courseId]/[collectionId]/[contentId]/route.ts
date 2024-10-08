import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req : NextRequest,{ params }: { params: { contentId: string } }) {
  try {
    const { contentId } = params;
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
