import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  adminSecret: z.string(),
  email: z.string().email(),
  disableDrm: z.boolean(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
  const { adminSecret, email, disableDrm } = parseResult.data;

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

  const response = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      disableDrm,
    },
  });

  return NextResponse.json(
    { data: response },
    {
      status: 200,
    },
  );
}
