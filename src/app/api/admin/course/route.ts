import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { z } from 'zod';

const requestBodySchema = z.object({
  adminSecret: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z
    .string()
    .url({ message: 'URL should be valid image url' })
    .or(z.string()),
  id: z.string(),
  slug: z.string(),
  appxCourseId: z.string(),
  discordRoleId: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const parseResult = requestBodySchema.safeParse(body);

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
      { message: 'Course Successfully added' },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Internal Server error',
      },
      { status: 500 },
    );
  }
}
