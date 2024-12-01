import { ChildCourseContent, FullCourseContent } from '@/db/course';
import { ContentRenderer } from './admin/ContentRenderer';
import { FolderView } from './FolderView';
import { NotionRenderer } from './NotionRenderer';
import { getFolderPercentCompleted } from '@/lib/utils';
import { QueryParams } from '@/actions/types';
import BreadCrumbComponent from './BreadCrumbComponent';
import Comments from './comment/Comments';
// import { Sidebar } from './Sidebar';

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
    <div className="flex w-full flex-col gap-8 pb-16 pt-8 xl:pt-[9px] relative">
      <div className="flex flex-col gap-4 xl:pt-2 sticky z-10 top-[120px] py-2 bg-background">
        <BreadCrumbComponent
          course={course}
          contentType={contentType}
          courseContent={courseContent}
          fullCourseContent={fullCourseContent}
          rest={rest}
        />
      </div>

      {!courseContent?.folder && courseContent?.value.type === 'notion' ? (
        <NotionRenderer id={courseContent?.value?.id?.toString()} />
      ) : null}

      {!courseContent?.folder && (contentType === 'video' || contentType === 'appx') ? (
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
