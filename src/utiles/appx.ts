import {
  getAllCoursesAndContentHierarchy,
  getAllVideos,
  getVideoProgressForUser,
} from '@/db/course';
import { authOptions } from '@/lib/auth';
import { Course } from '@/store/atoms';
import { getServerSession } from 'next-auth';
import { cache } from '@/db/Cache';
import prisma from '@/db';
import { checkUserEmailForPurchase } from './appx-check-mail';
import { refreshDbInternal } from '@/actions/refresh-db';

const LOCAL_CMS_PROVIDER = process.env.LOCAL_CMS_PROVIDER;
const COHORT_3_PARENT_COURSES = [8, 9, 10, 11, 12];
// 8 -> Web + Devops + Web3
// 9 -> Web + Devops
// 10 -> Web3
// 11 -> Web
// 12 -> Devops

export const APPX_COURSE_IDS = [1, 2, 3, 8, 9, 10, 11, 12];

function getExtraCourses(currentCourses: Course[], allCourses: Course[]) {
  const hasCohort2 = currentCourses
    .map((x) => x.id.toString())
    .find((x) => ['1', '2', '3'].includes(x.toString()));

  const hasCohort3 = currentCourses.find((x) =>
    COHORT_3_PARENT_COURSES.map((x) => x.toString()).includes(x.id.toString()),
  );

  let initialCourses: Course[] = [];

  if (hasCohort2) {
    initialCourses = [...allCourses.filter((x) => x.openToEveryone)];
  } else if (hasCohort3) {
    initialCourses = [...allCourses.filter((x) => x.id === 7 || x.id === 4)];
  }

  // We break down parent courses into child courses
  // for eg, (web dev + devops) breaks down to web dev and devops
  if (!hasCohort3) return initialCourses;

  const userCourses = [...initialCourses];

  let hasWebDev = false;
  let hasDevOps = false;
  let hasWeb3 = false;
  if (currentCourses.find((x) => x.id === 8)) {
    hasWebDev = true;
    hasDevOps = true;
    hasWeb3 = true;
  }

  if (currentCourses.find((x) => x.id === 9)) {
    hasWebDev = true;
    hasDevOps = true;
  }

  if (currentCourses.find((x) => x.id === 10)) {
    hasWeb3 = true;
  }

  if (currentCourses.find((x) => x.id === 11)) {
    hasWebDev = true;
  }

  if (currentCourses.find((x) => x.id === 12)) {
    hasDevOps = true;
  }

  if (hasWebDev) {
    userCourses.push(allCourses.find((x) => x.id === 14)!);
  }

  if (hasDevOps) {
    userCourses.push(allCourses.find((x) => x.id === 15)!);
  }

  if (hasWeb3) {
    userCourses.push(allCourses.find((x) => x.id === 13)!);
    userCourses.push(allCourses.find((x) => x.id === 20)!);
  }

  return userCourses;
}

interface CoursesError {
  type: 'error';
  message: string;
}

interface CoursesSuccess {
  type: 'success';
  courses: Course[];
}

type CoursesResponse = CoursesError | CoursesSuccess;

export async function getPurchases(email: string): Promise<CoursesResponse> {
  const value = await cache.get('courses', [email]);
  if (value) {
    return { courses: value, type: 'success' };
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
      discordOauthUrl: course.discordOauthUrl,
      ...(totalVideos > 0 && { totalVideos, totalVideosWatched }),
    };
  });

  if (LOCAL_CMS_PROVIDER) {
    return { type: 'success', courses };
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
      ...courses.filter((x) => coursesFromDb.map((x) => x.id).includes(x.id)),
      ...getExtraCourses(coursesFromDb, courses),
    ]
      .filter((x) => x.id)
      .filter((x) => !COHORT_3_PARENT_COURSES.includes(x.id));
    cache.set('courses', [email], allCourses, 60 * 60);
    return {
      type: 'success',
      courses: allCourses,
    };
  }

  console.log(`Purchase not found in DB ${email}`);

  const responses: Course[] = [];

  try {
    const promises = courses
      .filter((x) => APPX_COURSE_IDS.includes(x.id))
      .map(async (course) => {
        const courseId = course.appxCourseId.toString();
        const data = await checkUserEmailForPurchase(email, courseId);
        if (data.data === '1') {
          responses.push(course);
        }
      });
    await Promise.all(promises);

    if (responses.length) {
      const extraCourses = getExtraCourses(responses, courses);
      for (const course of extraCourses) {
        responses.push(course);
      }
    }

    // Remove the parent courses, child courses already added in getExtraCourses
    responses.filter((x) => !COHORT_3_PARENT_COURSES.includes(x.id));

    cache.set('courses', [email], responses, 60 * 60 * 24);
    refreshDbInternal(session?.user.id, session?.user.email);
    return {
      type: 'success',
      courses: responses,
    };
  } catch (error) {
    console.log(`Rate limitted for user ${email}`);
    return {
      type: 'error',
      message: 'Ratelimited via appx',
    };
  }
}

export async function getAppxCourseId(courseId: string) {
  const session = await getServerSession(authOptions);
  const parentCourses = await prisma.userPurchases.findMany({
    where: {
      courseId: {
        in: COHORT_3_PARENT_COURSES,
      },
      userId: session?.user?.id,
    },
    include: {
      course: true,
    },
    orderBy: {
      courseId: 'asc'
    }
  });

  const CMS_APPX_COURSE_MAP: Record<string, string[]> = {
    13: ["8", "10"],
    14: ["8", "9", "11"],
    15: ["8", "9", "12"]
  };

  let appxCourseId: string | null = null;
  parentCourses.forEach((pc => {
    if (CMS_APPX_COURSE_MAP[courseId].includes(pc.courseId.toString())) {
      appxCourseId = pc.course.appxCourseId;
    }
  }));
  return appxCourseId;
}
