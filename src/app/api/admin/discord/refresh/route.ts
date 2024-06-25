import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  adminSecret: z.string(),
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
  const { adminSecret, email } = parseResult.data;

  if (adminSecret !== process.env.ADMIN_SECRET) {
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

  try {
    // no need to check if discord is connected, delete will do nothing if it doesn't exist and will go to catch block
    await db.discordConnect.delete({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      {},
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: 'Discord Not Connected' },
      {
        status: 404,
      },
    );
  }
}
