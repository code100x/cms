import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const { courseId } = params;
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
