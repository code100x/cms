import {
  getAllCoursesAndContentHierarchy,
  getAllVideos,
  getVideoProgressForUser,
} from '@/db/course';
import { authOptions } from '@/lib/auth';
import { Course } from '@/store/atoms';
import { getServerSession } from 'next-auth';
import { Cache } from '@/db/Cache';
import prisma from '@/db';
import { checkUserEmailForPurchase } from './appx-check-mail';

const LOCAL_CMS_PROVIDER = process.env.LOCAL_CMS_PROVIDER;

export async function getPurchases(email: string): Promise<Course[]> {
  const value = await Cache.getInstance().get('courses', [email]);
  if (value) {
    return value;
  }
  const _courses = await getAllCoursesAndContentHierarchy();
  const session = await getServerSession(authOptions);
  const userVideoProgress = await getVideoProgressForUser(
    session?.user?.id || '',
    true,
  );
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
    return courses;
  }

  // Check if the user exists in the db
  const coursesFromDb = await prisma.course.findMany({
    where: {
      purchasedBy: {
        some: {
          user: {
            email,
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
    await Cache.getInstance().set('courses', [email], allCourses, 60 * 60);
    return allCourses;
  }

  const responses: Course[] = [];

  const promises = courses
    .filter((x) => !x.openToEveryone)
    .map(async (course) => {
      const courseId = course.appxCourseId.toString();
      const data = await checkUserEmailForPurchase(email, courseId);
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

  await Cache.getInstance().set('courses', [email], responses, 60 * 60 * 24);
  return responses;
}
