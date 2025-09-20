import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = JSON.parse(req.headers.get('g') || '');
    if (!user) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 400 });
    }
    const userCourses = await db.course.findMany({
      where: {
        purchasedBy: {
          some: {
            user: {
              email: user.email,
            },
          },
        },
      },
    });

    return NextResponse.json({
      message: 'User courses fetched successfully',
      data: userCourses,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching user courses', error },
      { status: 500 },
    );
  }
}
