import { z } from 'zod';
import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const authKey = req.headers.get('Auth-Key');

  if (authKey !== process.env.JOB_BOARD_AUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const payload = await req.json();

    const result = loginSchema.safeParse(payload);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.errors },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    const user = await db.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    // Perform a dummy bcrypt compare if user doesn't exist to prevent timing attacks
    if (!user || !user.password) {
      await bcrypt.compare(password, await bcrypt.hash('dummy', 10));
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const courses = await db.course.findMany({
        where: {
          purchasedBy: {
            some: {
              user: { email },
            },
          },
        },
      });

      return NextResponse.json({
        message: 'User found',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          courses,
        },
      });
    }
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching user' },
      { status: 500 },
    );
  }
}
