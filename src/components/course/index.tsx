import { ChildCourseContent, FullCourseContent } from '@/db/course';
import { ContentRenderer } from './content-renderer';
import { FolderView } from './FolderView';
import { NotionRenderer } from './NotionRenderer';
import {
  constructCommentPrismaQuery,
  getFolderPercentCompleted,
  paginationData,
} from '@/lib/utils';
import { QueryParams } from '@/actions/types';
import BreadCrumbComponent from './BreadCrumbComponent';
import Comments from './comment/Comments';
import { Course } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { getComments } from '@/actions/comment';
import CourseContentList from '../helper/CourseContentList';

export const CourseView = async ({
  rest,
  course,
  fullCourseContent,
  courseContent,
  nextContent,
  searchParams,
  possiblePath,
}: {
  fullCourseContent: FullCourseContent[];
  rest: string[];
  course: Course;
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
  const contentType = courseContent?.folder
    ? 'folder'
    : courseContent?.value.type;

  const session = await getServerSession();

  const paginationInfo = paginationData(searchParams);
  const q = constructCommentPrismaQuery(
    searchParams,
    paginationInfo,
    // @ts-ignore
    courseContent?.value?.id,
    // @ts-ignore
    session?.user.id,
  );

  const commentsData = await getComments(q, searchParams.parentId);

  return (
    <div className="flex w-full flex-col gap-8 pb-16 pt-8">
      <div className="flex flex-col gap-4">
        <BreadCrumbComponent
          course={course}
          contentType={contentType}
          courseContent={courseContent}
          fullCourseContent={fullCourseContent}
          rest={[]}
        />
      </div>
      {!courseContent?.folder && courseContent?.value.type === 'notion' ? (
        <div className="gap-2 md:flex">
          <div className="w-full gap-4 md:flex md:w-3/4 md:flex-col">
            <NotionRenderer id={courseContent?.value?.id?.toString()} />
            <Comments
              data={commentsData}
              content={{
                id: courseContent?.value?.id || 0,
                courseId: course.id,
                //@ts-ignore
                commentCount: courseContent?.value.commentsCount || 0,
                possiblePath,
              }}
              searchParams={searchParams}
            />
          </div>
          <div className="w-full md:w-1/4">
            <CourseContentList
              courseId={course.id}
              fullCourseContent={fullCourseContent}
            />
          </div>
        </div>
      ) : null}

      {!courseContent?.folder && contentType === 'video'
        ? await ContentRenderer({
            commentsData,
            content: {
              thumbnail: courseContent?.value?.thumbnail || '',
              id: courseContent?.value.id || 0,
              title: courseContent?.value?.title || '',
              type: contentType || 'video',
              description: courseContent?.value?.description || '',
              markAsCompleted:
                courseContent?.value?.videoProgress?.markAsCompleted || false,
              bookmark: courseContent?.value.bookmark ?? null,
              //@ts-ignore
              commentsCount: courseContent?.value.commentsCount || 0,
            },
            courseId: course.id,
            fullCourseContent,
            nextContent,
            searchParams,
          })
        : null}

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
            bookmark: null,
          }))}
          courseId={course.id}
        />
      ) : null}
    </div>
  );
};
