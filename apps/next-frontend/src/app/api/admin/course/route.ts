import { NextRequest, NextResponse } from 'next/server';
import db from '@repo/db/client';
import { courseRequestBodySchema } from '@repo/common/schema/admin';

export async function POST(req: NextRequest) {
  const parseResult = courseRequestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }

  const {
    adminSecret,
    title,
    description,
    imageUrl,
    id,
    slug,
    appxCourseId,
    discordRoleId,
  } = parseResult.data;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  await db.course.create({
    data: {
      title,
      imageUrl,
      slug,
      description,
      id: parseInt(id, 10),
      appxCourseId: parseInt(appxCourseId, 10),
      discordRoleId,
    },
  });

  return NextResponse.json(
    {},
    {
      status: 200,
    },
  );
}
