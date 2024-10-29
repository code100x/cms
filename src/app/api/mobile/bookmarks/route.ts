import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = JSON.parse(req.headers.get('g') || '');
    const userId = user?.id;
    if (!user) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 400 });
    }
    const userBookmarks = await db.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      message: 'User bookmarks fetched successfully',
      data: userBookmarks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching user bookmarks', error },
      { status: 500 },
    );
  }
}
