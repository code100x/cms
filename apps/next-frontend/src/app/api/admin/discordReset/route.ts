import { NextRequest, NextResponse } from 'next/server';
import db from '@repo/db';
import { z } from 'zod';

const requestBodySchema = z.object({
  adminPassword: z.string(),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }

  const { adminPassword, email } = parseResult.data;

  if (adminPassword !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ msg: 'User not found' }, { status: 404 });
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
}
