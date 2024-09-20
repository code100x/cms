import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { env } from '@/env';

export async function POST(req: NextRequest) {
  const authKey = req.headers.get('Auth-Key');

  if (authKey !== env.JOB_BOARD_AUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const payload = await req.json();
    const { email, password } = payload;
    const user = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const courses = await db.course.findMany({
        where: {
          purchasedBy: {
            some: {
              user: {
                email,
              },
            },
          },
        },
      });
      return NextResponse.json({
        message: 'User found',
        data: {
          user,
          courses,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching user' },
      { status: 500 },
    );
  }
}
