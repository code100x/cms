import db from '@/db';
import { Cache } from '@/db/Cache';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Bookmark } from '@prisma/client';
import { getBookmarkData } from './bookmark';

export interface Content {
  id: number;
  type: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  parentId: number | null;
  createdAt: string;
  children: Content[];
  videoProgress?: {
    currentTimestamp: string;
    markAsCompleted?: boolean;
  };
}

export interface Folder extends Content {
  type: 'folder';
}

export interface Video extends Content {
  type: 'video';
}

export async function getAllCourses() {
  const value = await Cache.getInstance().get('getAllCourses', []);
  if (value) {
    return value;
  }
  const courses = await db.course.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  Cache.getInstance().set('getAllCourses', [], courses);
  return courses;
}

export async function getAllCoursesAndContentHierarchy(): Promise<
  {
    id: number;
    title: string;
    description: string;
    appxCourseId: number;
    discordRoleId: string;
    slug: string;
    imageUrl: string;
    openToEveryone: boolean;
    certIssued: boolean;
    content: {
      contentId: number;
    }[];
  }[]
> {
  const value = await Cache.getInstance().get(
    'getAllCoursesAndContentHierarchy',
    [],
  );
  if (value) {
    return value;
  }

  const courses = await db.course.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      appxCourseId: true,
      openToEveryone: true,
      certIssued: true,
      slug: true,
      discordRoleId: true,
      content: {
        select: {
          contentId: true,
        },
      },
    },
  });

  Cache.getInstance().set('getAllCoursesAndContentHierarchy', [], courses);
  return courses;
}

export async function getAllVideos(): Promise<
  {
    id: number;
    type: string;
    title: string;
    hidden: boolean;
    description: string | null;
    thumbnail: string | null;
    parentId: number | null;
    createdAt: Date;
    notionMetadataId: number | null;
  }[]
> {
  const value = await Cache.getInstance().get('getAllVideos', []);
  if (value) {
    return value;
  }
  const courses = await db.content.findMany({
    where: {
      type: 'video',
      hidden: false,
    },
  });
  Cache.getInstance().set('getAllVideos', [], courses);
  return courses;
}

export async function getCourse(courseId: number) {
  const value = await Cache.getInstance().get('getCourse', [
    courseId.toString(),
  ]);
  if (value) {
    return value;
  }

  const courses = db.course.findFirst({
    where: {
      id: courseId,
    },
  });
  Cache.getInstance().set('getCourse', [courseId.toString()], courses);
  return courses;
}

export const getNextVideo = async (currentVideoId: number) => {
  if (!currentVideoId) {
    return null;
  }
  const value = await Cache.getInstance().get('getNextVideo', [
    currentVideoId.toString(),
  ]);
  if (value) {
    return value;
  }
  const currentContent = await db.content.findFirst({
    where: {
      id: currentVideoId,
    },
  });

  const latestContent = await db.content.findFirst({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: {
      parentId: {
        equals: currentContent?.parentId,
      },
      id: {
        gt: currentVideoId,
      },
    },
  });
  Cache.getInstance().set(
    'getNextVideo',
    [currentVideoId.toString()],
    latestContent,
  );
  return latestContent;
};

async function getAllContent(): Promise<
  {
    id: number;
    type: string;
    title: string;
    description: string | null;
    thumbnail: string | null;
    parentId: number | null;
    createdAt: Date;
    VideoMetadata: {
      duration: number | null;
    } | null;
  }[]
> {
  const value = Cache.getInstance().get('getAllContent', []);
  if (value) {
    return value;
  }
  const allContent = await db.content.findMany({
    where: {
      hidden: false,
    },
    include: {
      VideoMetadata: {
        select: {
          duration: true,
        },
      },
    },
  });
  Cache.getInstance().set('getAllContent', [], allContent);

  return allContent;
}

interface ContentWithMetadata {
  id: number;
  type: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  parentId: number | null;
  createdAt: Date;
  VideoMetadata?: {
    duration: number | null;
  } | null;
}

async function getRootCourseContent(courseId: number): Promise<
  {
    content: ContentWithMetadata;
  }[]
> {
  const value = Cache.getInstance().get('getRootCourseContent', [
    courseId.toString(),
  ]);
  if (value) {
    return value;
  }
  const courseContent = await db.courseContent.findMany({
    orderBy: [
      {
        contentId: 'asc',
      },
    ],
    where: {
      courseId,
    },
    include: { content: true },
  });
  Cache.getInstance().set(
    'getRootCourseContent',
    [courseId.toString()],
    courseContent,
  );
  return courseContent;
}

export function getVideoProgressForUser(
  userId: string,
  markAsCompleted?: boolean,
) {
  return db.videoProgress.findMany({
    where: {
      userId,
      markAsCompleted,
    },
  });
}

interface VideoProgress {
  duration: number | null;
  markAsCompleted?: boolean;
  videoFullDuration: number | null;
}

export type FullCourseContent = {
  children?: ({
    videoProgress: VideoProgress | null;
    bookmark?: Bookmark;
  } & ContentWithMetadata)[];
  videoProgress: VideoProgress | null;
  bookmark?: Bookmark;
} & ContentWithMetadata;

//TODO: add a cache here

export const getFullCourseContent = async (
  courseId: number,
): Promise<FullCourseContent[]> => {
  // const value = Cache.getInstance().get('getFullCourseContent', [
  //   courseId.toString(),
  // ]);
  // if (value) {
  //   return value;
  // }
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return [];
  }
  const contents = await getAllContent();
  const courseContent = await getRootCourseContent(courseId);
  const videoProgress = await getVideoProgressForUser(session?.user?.id);
  const bookmarkData = await getBookmarkData();
  const contentMap = new Map<string, FullCourseContent>(
    contents.map((content: any) => [
      content.id,
      {
        ...content,
        children: [],
        bookmark: bookmarkData.find((x) => x.contentId === content.id),
        videoProgress:
          content.type === 'video'
            ? {
                duration: videoProgress.find((x) => x.contentId === content.id)
                  ?.currentTimestamp,
                markAsCompleted: videoProgress.find(
                  (x) => x.contentId === content.id,
                )?.markAsCompleted,
                videoFullDuration: content.VideoMetadata?.duration,
              }
            : null,
      },
    ]),
  );

  const rootContents: FullCourseContent[] = [];

  contents
    .sort((a, b) => (a.id < b.id ? -1 : 1))
    .forEach((content: any) => {
      if (content.parentId) {
        contentMap
          .get(content.parentId)
          ?.children?.push(contentMap.get(content.id)!);
      } else if (courseContent.find((x: any) => x.contentId === content.id)) {
        rootContents.push(contentMap.get(content.id)!);
      }
    });

  Cache.getInstance().set(
    'getFullCourseContent',
    [courseId.toString()],
    rootContents,
  );
  return rootContents;
};

export const getCourseContent = async (
  courseId: number,
  childrenIds: number[],
) => {
  const value = Cache.getInstance().get('getCourseContent', [
    courseId.toString(),
    ...childrenIds.map((x) => x.toString()),
  ]);

  if (value) {
    return value;
  }

  if (childrenIds.length === 0) {
    const courseContent = await db.courseContent.findMany({
      orderBy: [
        {
          contentId: 'asc',
        },
      ],
      where: {
        courseId,
      },
      include: { content: true },
    });
    Cache.getInstance().set(
      'getCourseContent',
      [courseId.toString(), ...childrenIds.map((x) => x.toString())],
      courseContent.map((content) => content.content),
    );
    return courseContent.map((content) => content.content);
  }

  const content = await db.content.findFirst({
    where: {
      id: childrenIds[childrenIds.length - 1],
    },
  });

  if (content?.type === 'folder') {
    const courseContent = await db.content.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
      where: {
        parentId: {
          equals: childrenIds[childrenIds.length - 1],
        },
      },
    });
    Cache.getInstance().set(
      'getCourseContent',
      [courseId.toString(), ...childrenIds.map((x) => x.toString())],
      courseContent,
    );

    return courseContent;
  }
  Cache.getInstance().set(
    'getCourseContent',
    [courseId.toString(), ...childrenIds.map((x) => x.toString())],
    [content],
  );

  return [content];
};

export const getCurrentContentType = async (
  courseId: number,
  childrenIds: number[],
) => {
  if (childrenIds.length === 0) {
    return 'folder';
  }

  const content = await db.content.findFirst({
    where: {
      id: childrenIds[childrenIds.length - 1],
    },
  });

  if (!content) {
    return 'folder';
  }

  return content.type;
};

export async function getGithubDetail({ userId }: { userId: string }) {
  try {
    const bountyInfo = await db.githubUser.findFirst({
      where: { userId },
      include: { bountyInfo: true },
    });
    return bountyInfo;
  } catch (e) {
    return null;
  }
}

export async function getAllBountyDetail() {
  try {
    const userInfo = await db.githubUser.findMany({
      include: { bountyInfo: true },
    });

    const bountyInfo = await db.bountyInfo.findMany();
    const allInfo = { userInfo, bountyInfo };

    return allInfo;
  } catch (e) {
    return null;
  }
}
