import db from '@repo/db/client';
import { NextRequest, NextResponse } from 'next/server';
import { drmRequestBodySchema } from '@repo/common/schema/admin';

export async function POST(req: NextRequest) {
  const parseResult = drmRequestBodySchema.safeParse(await req.json());

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
