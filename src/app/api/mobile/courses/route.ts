
import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';
// import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
  try {
    console.log(req);
    const user = {
      id: '1',
      appxUserId: '100',
      disableDrm: false,
      email: 'testuser@example.com',
      password: 'fjklasjf',
      token: 'jfskd.fjskdf.fsdf',
    };

    console.log(user);
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
