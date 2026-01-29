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
    includeScore: true,
    threshold: 0.2,
    distance: 100,
    ignoreLocation: true,
    useExtendedSearch: true
  }).search(searchQuery);

  return searchedVideos.map((video) => video.item);
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q');

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  if (searchQuery && searchQuery.length > 2) {
    const value: TSearchedVideos[] = await cache.get(
      'getAllVideosForSearch',
      [],
    );

    if (value) {
      return NextResponse.json(fuzzySearch(value, searchQuery));
    }

    const allVideos = await db.content.findMany({
      where: {
        type: 'video',
        hidden: false,
        courses: {
          some: {
            course: {
              purchasedBy: {
                some: {
                  userId
                }
              }
            }
           }
        }
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

    cache.set('getAllVideosForSearch', [], allVideos, 24 * 60 * 60);

    return NextResponse.json(fuzzySearch(allVideos, searchQuery));
  }

  return NextResponse.json({}, { status: 400 });
}
