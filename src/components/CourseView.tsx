import { ChildCourseContent, FullCourseContent } from '@/db/course';
import { ContentRenderer } from './admin/ContentRenderer';
import { FolderView } from './FolderView';
import { NotionRenderer } from './NotionRenderer';
import { getFolderPercentCompleted } from '@/lib/utils';
import Comments from './comment/Comments';
import { QueryParams } from '@/actions/types';
import BreadCrumbComponent from './BreadCrumbComponent';

export const CourseView = ({
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
  const contentType = courseContent?.folder
    ? 'folder'
    : courseContent?.value.type;
  return (
    <div className="no-scrollbar flex h-screen flex-col overflow-y-auto pb-20">
      <div className="mb-2 flex max-h-fit min-h-[2.5rem] items-center px-4">
        <BreadCrumbComponent
          course={course}
          contentType={contentType}
          courseContent={courseContent}
          fullCourseContent={fullCourseContent}
          rest={rest}
        />
      </div>
      {!courseContent?.folder && courseContent?.value.type === 'notion' ? (
        <div className="m-4">
          <NotionRenderer id={courseContent?.value?.id?.toString()} />
        </div>
      ) : null}

      {!courseContent?.folder && contentType === 'video' ? (
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
            bookmark: courseContent?.value.bookmark ?? null,
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
            bookmark: null,
          }))}
          courseId={parseInt(course.id, 10)}
        />
      ) : null}
    </div>
  );
};
