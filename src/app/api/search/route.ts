import { cache } from '@/db/Cache';
import db from '@/db';
import { CourseContent } from '@prisma/client';
import Fuse from 'fuse.js';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q');
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 401 });
    }

    if (searchQuery && searchQuery.length > 2) {
      const value: TSearchedVideos[] = await cache.get(
        'getAllVideosForSearch',
        [session.user.id],
      );

      if (value) {
        return NextResponse.json(fuzzySearch(value, searchQuery));
      }

      const allVideos = await db.content.findMany({
        where: {
          type: 'video',
          hidden: false,
          parent: {
            courses: {
              some: {
                course: {
                  purchasedBy: {
                    some: {
                      userId: session.user.id,
                    },
                  },
                },
              },
            },
          },
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

      cache.set('getAllVideosForSearch', [session.user.id], allVideos, 24 * 60 * 60);

      return NextResponse.json(fuzzySearch(allVideos, searchQuery));
    }

    return NextResponse.json({}, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching search results', err },
      { status: 500 },
    );
  }
}
