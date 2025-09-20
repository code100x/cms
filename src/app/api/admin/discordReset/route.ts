import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { z } from 'zod';

const requestBodySchema = z.object({
  adminPassword: z.string(),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message, message: 'Invalid Input data' },
      { status: 400 },
    );
  }

  try {
    const { adminPassword, email } = parseResult.data;

    if (adminPassword !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        {
          message: 'Invalid Admin Password',
        },
        { status: 401 },
      );
    }

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const response = await db.discordConnectBulk.updateMany({
      where: {
        userId: user.id,
        cohortId: '3',
      },
      data: {
        cohortId: Math.random().toString(),
      },
    });

    return NextResponse.json(
      { data: response },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
