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

export type CourseCreateType = z.infer<typeof requestBodySchema>;
export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());
  try {
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.message },
        { status: 400 },
      );
    }

    const { adminSecret, title, id, appxCourseId, imageUrl, slug, description, discordRoleId } = parseResult.data;

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({}, { status: 401 });
    }

    const res = await db.course.create({
      data: {
        title,
        imageUrl,
        slug,
        description,
        id: parseInt(id, 10),
        appxCourseId: parseInt(appxCourseId, 10).toString(),
        discordRoleId,
      },
    });

    return NextResponse.json(
      { message: 'Course successfully created.', data: res },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
