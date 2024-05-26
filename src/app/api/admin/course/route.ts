import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { adminCourseCreationSchema } from '@/utiles/zodSchemas';

export async function POST(req: NextRequest) {
  const parseResult = adminCourseCreationSchema.safeParse(await req.json());

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

  if (isNaN(Number(id)) || isNaN(Number(appxCourseId))) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
    { message: 'Course created' },
    {
      status: 200,
    },
  );
}
