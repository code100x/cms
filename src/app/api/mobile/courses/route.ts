import { NextResponse, NextRequest } from 'next/server';
import db from '@/db';
import { Course } from '@/store/atoms';

const COHORT_3_PARENT_COURSES = [8, 9, 10, 11, 12];

export function getExtraCourses(
  currentCourses: Course[],
  allCourses: Course[],
): Course[] {
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

  if (!hasCohort3) return initialCourses;

  const userCourses = [...initialCourses];

  let hasWebDev = false;
  let hasDevOps = false;
  let hasWeb3 = false;

  if (currentCourses.find((x) => x.id === 8)) {
    hasWebDev = hasDevOps = hasWeb3 = true;
  }
  if (currentCourses.find((x) => x.id === 9)) {
    hasWebDev = hasDevOps = true;
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

  // Add specific courses based on user's access
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

export async function GET(req: NextRequest) {
  try {
    const user = JSON.parse(req.headers.get('g') || '');

    if (!user) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 400 });
    }

    const purchasedCourses = await db.course.findMany({
      where: {
        purchasedBy: {
          some: {
            user: {
              email: user.email,
            },
          },
        },
      },
    });

    const allCourses = await db.course.findMany();

    const extraCourses = getExtraCourses(purchasedCourses, allCourses);

    // Combine and filter out parent courses
    const userCourses = [...purchasedCourses, ...extraCourses].filter(
      (course) => !COHORT_3_PARENT_COURSES.includes(course.id),
    );

    // Remove duplicates based on course ID
    const uniqueUserCourses = Array.from(
      new Map(userCourses.map((course) => [course.id, course])).values(),
    );

    return NextResponse.json({
      message: 'User courses fetched successfully',
      data: uniqueUserCourses,
    });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return NextResponse.json(
      { message: 'Error fetching user courses', error },
      { status: 500 },
    );
  }
}
