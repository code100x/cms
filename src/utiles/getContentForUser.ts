import {
  getAllCoursesAndContentHierarchy,
  getAllVideos,
  getVideoProgressForUser,
} from '@/db/course';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

// TODO: Refactor this in future
// TODO: a lot of logic can be simplified
//! Works but can be done in future
export async function getPurchases(email: string) {
  const _courses = await getAllCoursesAndContentHierarchy(email);
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
      discordRoleId: course.discordRoleId,
      ...(totalVideos > 0 && { totalVideos, totalVideosWatched }),
    };
  });

  return courses;
}
