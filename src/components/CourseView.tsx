import { ChildCourseContent, FullCourseContent } from '@/db/course';
import { ContentRenderer } from './admin/ContentRenderer';
import { FolderView } from './FolderView';
import { NotionRenderer } from './NotionRenderer';
import { getFolderPercentCompleted } from '@/lib/utils';
import { QueryParams } from '@/actions/types';
import BreadCrumbComponent from './BreadCrumbComponent';
import Comments from './comment/Comments';
import { Sidebar } from './Sidebar';
import { FilterContent } from './FilterContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export const CourseView = async ({
  courseId,
  rest,
  course,
  fullCourseContent,
  courseContent,
  nextContent,
  searchParams,
  possiblePath,
}: {
  courseId: string;
  fullCourseContent: FullCourseContent[];
  rest: string[];
  course: any;
  courseContent:
    | {
        folder: true;
        value: ChildCourseContent[];
      }
    | {
        folder: false;
        value: ChildCourseContent;
      }
    | null;
  nextContent: any;
  searchParams: QueryParams;
  possiblePath: string;
}) => {
  type CheckAccessReturn = 'yes' | 'no' | 'error';

  const checkAccess = async (courseId: string): Promise<CheckAccessReturn> => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return 'no';
    }
    const response = await getPurchases(session.user.email);
    if (response.type === 'error') {
      return 'error';
    }
    const purchases = response.courses;
    if (purchases.map((p) => p.id).includes(Number(courseId))) {
      return 'yes';
    }
    return 'no';
  };
  const contentType = courseContent?.folder
    ? 'folder'
    : courseContent?.value.type;
  const hasAccess = await checkAccess(courseId);

  if (hasAccess === 'no') {
    redirect('/api/auth/signin');
  }

  if (hasAccess === 'error') {
    toast.error('Ratelimited by appx please try again later');
  }

  return (
    <div className="relative flex w-full flex-col gap-2 pb-16">
      <div className="wrapper fixed left-0 right-0 top-[65px] z-20 flex h-auto flex-col-reverse items-start justify-between gap-1 bg-background py-1 sm:flex-row sm:items-center sm:gap-4 xl:pt-2">
        <BreadCrumbComponent
          course={course}
          contentType={contentType}
          courseContent={courseContent}
          fullCourseContent={fullCourseContent}
          rest={rest}
        />
        <div className="flex w-full max-w-screen-sm items-center justify-between sm:w-auto sm:gap-4">
          <div className="2/3">
            <Sidebar
              fullCourseContent={fullCourseContent}
              courseId={courseId}
            />
          </div>
          <div>
            <FilterContent />
          </div>
        </div>
      </div>

      {!courseContent?.folder && courseContent?.value.type === 'notion' ? (
        <NotionRenderer
          id={courseContent?.value?.id?.toString()}
          courseId={courseContent.value.id}
        />
      ) : null}
      {!courseContent?.folder &&
      (contentType === 'video' || contentType === 'appx') ? (
        <ContentRenderer
          nextContent={nextContent}
          content={{
            thumbnail: courseContent?.value?.thumbnail || '',
            id: courseContent?.value.id || 0,
            title: courseContent?.value?.title || '',
            type: contentType || 'video',
            description: courseContent?.value?.description || '',
            markAsCompleted:
              courseContent?.value?.videoProgress?.markAsCompleted || false,
            bookmark: courseContent?.value.bookmark || null,
            courseId: course.id,
          }}
        />
      ) : null}
      {!courseContent?.folder &&
        (contentType === 'video' || contentType === 'notion') && (
          <Comments
            content={{
              id: courseContent?.value?.id || 0,
              courseId: parseInt(course.id, 10) || 0,
              //@ts-ignore
              commentCount: courseContent?.value.commentsCount || 0,
              possiblePath,
            }}
            searchParams={searchParams}
          />
        )}
      {courseContent?.folder ? (
        <FolderView
          rest={rest}
          courseContent={courseContent?.value.map((x: any) => ({
            title: x?.title || '',
            image: x?.thumbnail || '',
            type: x?.type || 'folder',
            id: x?.id || 0,
            markAsCompleted: x?.videoProgress?.markAsCompleted || false,
            percentComplete: getFolderPercentCompleted(x?.children),
            videoFullDuration: x?.videoProgress?.videoFullDuration || 0,
            duration: x?.videoProgress?.duration || 0,
            bookmark: x.bookmark || null,
          }))}
          courseId={parseInt(course.id, 10)}
        />
      ) : null}
    </div>
  );
};
