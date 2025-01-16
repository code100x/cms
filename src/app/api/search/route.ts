import { cache } from '@/db/Cache';
import db from '@/db';
import { CourseContent } from '@prisma/client';
import Fuse from 'fuse.js';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

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
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q');

  if (searchQuery && searchQuery.length > 2) {
    const value: TSearchedVideos[] = await cache.get(
      'getAllVideosForSearch',
      [],
    );

    if (value) {
      return NextResponse.json(fuzzySearch(value, searchQuery));
    }

    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({}, { status: 401 }); 
    }

    const userPurchases = await db.userPurchases.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
      select: {
        courseId: true,
      },
    });

    const purchasedCourseIds = userPurchases.map((purchase) => purchase.courseId);

    const allVideos = await db.content.findMany({
      where: {
        type: 'video',
        hidden: false,
        OR: [
          {
            parent: {
              courses: {
                some: {
                  courseId: {
                    in: purchasedCourseIds,
                  },
                },
              },
            },
          },
          {
            parent: {
              courses: {
                some: {
                  course: {
                    openToEveryone: true,
                  },
                },
              },
            },
          }
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

    cache.set('getAllVideosForSearch', [], allVideos, 24 * 60 * 60);

    return NextResponse.json(fuzzySearch(allVideos, searchQuery));
  }

  return NextResponse.json({}, { status: 400 });
}
