import prisma from '@/db';
import { Cache } from '@/db/Cache';
import {
  getAllCoursesAndContentHierarchy,
  getAllVideos,
  getVideoProgressForUser,
} from '@/db/course';
import { Course } from '@/store/atoms';
import { checkUserEmailForPurchase } from '@/utiles/appx-check-mail';
import { NextRequest, NextResponse } from 'next/server';

const LOCAL_CMS_PROVIDER = process.env.LOCAL_CMS_PROVIDER;

export async function GET(req: NextRequest) {
  // TODO: Use auth
  const user = {
    id: '1',
    appxUserId: '100',
    appxUsername: 'sargam',
    disableDrm: false,
    email: 'testuser@example.com',
    name: 'sargam',
    password: 'fjklasjf',
    token: 'jfskd.fjskdf.fsdf',
  };

  const cachedCourses = Cache.getInstance().get('courses', [user.email]);
  if (cachedCourses) {
    return NextResponse.json({
      data: cachedCourses,
    });
  }

  const _courses = await getAllCoursesAndContentHierarchy();
  const userVideoProgress = await getVideoProgressForUser(user.id || '', true);
  const allVideos = await getAllVideos();

  const completedVideosLookup: { [key: string]: boolean } =
    userVideoProgress?.reduce((acc: any, progress) => {
      acc[progress.contentId] = true;
      return acc;
    }, {});

  const courses = _courses.map((course) => {
    let totalVideos = 0;
    let totalVideosWatched = 0;
    course.content.forEach(({ contentId }) => {
      allVideos.forEach(({ parentId, id }) => {
        if (parentId === contentId) {
          totalVideos++;
          if (completedVideosLookup[id]) {
            totalVideosWatched++;
          }
        }
      });
    });

    return {
      id: course.id,
      title: course.title,
      imageUrl: course.imageUrl,
      description: course.description,
      appxCourseId: course.appxCourseId,
      openToEveryone: course.openToEveryone,
      slug: course.slug,
      certIssued: course.certIssued,
      discordRoleId: course.discordRoleId,
      ...(totalVideos > 0 && { totalVideos, totalVideosWatched }),
    };
  });

  if (LOCAL_CMS_PROVIDER) {
    return NextResponse.json({ data: courses });
  }

  // Check if the user exists in the db
  const coursesFromDb = await prisma.course.findMany({
    where: {
      purchasedBy: {
        some: {
          user: {
            // TODO:
            email: user.email,
          },
        },
      },
    },
  });

  if (coursesFromDb && coursesFromDb.length) {
    const allCourses = [
      ...coursesFromDb,
      ...courses.filter((x) => x.openToEveryone),
    ];
    // TODO:
    Cache.getInstance().set('courses', [user.email], allCourses, 60 * 60);
    return allCourses;
  }

  const responses: Course[] = [];

  const promises = courses
    .filter((x) => !x.openToEveryone)
    .map(async (course) => {
      const courseId = course.appxCourseId.toString();
      const data = await checkUserEmailForPurchase(user.email, courseId);
      if (data.data === '1') {
        responses.push(course);
      }
    });

  await Promise.all(promises);

  if (responses.length) {
    for (const course of courses) {
      if (course.openToEveryone) {
        responses.push(course);
      }
    }
  }

  Cache.getInstance().set('courses', [user.email], responses, 60 * 60 * 24);
  return NextResponse.json({
    data: responses,
  });
}
