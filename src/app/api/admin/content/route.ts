import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const {
    type,
    thumbnail,
    title,
    courseId,
    parentContentId,
    adminPassword,
  }: {
    type: 'video' | 'folder' | 'notion';
    thumbnail: string;
    title: string;
    courseId: number;
    parentContentId: number;
    metadata: any;
    adminPassword: string;
  } = await req.json();

  if (adminPassword !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 403 });
  }

  const content = await db.content.create({
    data: {
      type,
      title,
      parentId: parentContentId,
      thumbnail,
    },
  });

  if (type === 'folder') {
    if (courseId && !parentContentId) {
      await db.courseContent.create({
        data: {
          courseId,
          contentId: content.id,
        },
      });
    }
  } else if (type === 'notion') {
    if (courseId && !parentContentId) {
      await db.courseContent.create({
        data: {
          courseId,
          contentId: content.id,
        },
      });
    }
  } else if (type === 'video') {
    if (courseId && !parentContentId) {
      await db.courseContent.create({
        data: {
          courseId,
          contentId: content.id,
        },
      });
    }
  }
  return NextResponse.json({}, { status: 200 });
};
