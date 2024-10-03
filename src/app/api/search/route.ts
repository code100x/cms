import { cache } from '@/db/Cache';
import db from '@/db';
import { CourseContent } from '@prisma/client';
import Fuse from 'fuse.js';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export type TSearchedVideos = {
  id: number;
  parentId: number | null;
  title: string;
} & {
  parent: { courses: CourseContent[] } | null;
};

const fuzzySearch = (videos: TSearchedVideos[], searchQuery: string) => {
  const searchedVideos = new Fuse(videos, {
    minMatchCharLength: 3,
    keys: ['title'],
  }).search(searchQuery);
  return searchedVideos.map((video) => video.item);
};

function isAdmin(email: string): boolean {
  console.log('isAdmin called ', email);
  const adminEmails = process.env.ADMINS?.split(',') || [];
  return adminEmails.includes(email);
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q');

  if (searchQuery && searchQuery.length > 2) {
    const userIsAdmin = isAdmin(session.user.email);
    const cacheKey = `getAllVideosForSearch:${session.user.id}:${userIsAdmin ? 'admin' : 'user'}`;
    let value: TSearchedVideos[] = await cache.get(cacheKey, []);

    if (!value || value.length === 0) {
      if (userIsAdmin) {
        console.log('Fetching all videos for admin users');
        value = await db.content.findMany({
          where: {
            type: 'video',
            hidden: false,
          },
          select: {
            id: true,
            parentId: true,
            title: true,
            parent: {
              select: {
                courses: true,
              },
            },
          },
        });
      } else {
        const userPurchases = await db.userPurchases.findMany({
          where: { userId: session.user.id },
          select: { courseId: true },
        });

        const purchasedCourseIds = userPurchases.map(
          (purchase) => purchase.courseId,
        );

        value = await db.content.findMany({
          where: {
            type: 'video',
            hidden: false,
            OR: [
              { courses: { some: { course: { openToEveryone: true } } } },
              { courses: { some: { courseId: { in: purchasedCourseIds } } } },
            ],
          },
          select: {
            id: true,
            parentId: true,
            title: true,
            parent: {
              select: {
                courses: true,
              },
            },
          },
        });
      }

      cache.set(cacheKey, [], value, 24 * 60 * 60);
    }

    return NextResponse.json(fuzzySearch(value, searchQuery));
  }

  return NextResponse.json({}, { status: 400 });
}
