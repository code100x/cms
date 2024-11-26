import { ChildCourseContent, FullCourseContent } from '@/db/course';
import { ContentRenderer } from './admin/ContentRenderer';
import { FolderView } from './FolderView';
import { NotionRenderer } from './NotionRenderer';
import { getFolderPercentCompleted } from '@/lib/utils';
import { QueryParams } from '@/actions/types';
import BreadCrumbComponent from './BreadCrumbComponent';
import Comments from './comment/Comments';
import { MarkCompletedButton } from './MarkCompletedButton';
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
    <div className="relative flex w-full flex-col gap-8 pb-16 pt-8 xl:pt-[9px]">
      <div className="sticky top-[120px] z-10 flex items-center justify-between gap-4 bg-background py-2 xl:pt-2">
        <BreadCrumbComponent
          course={course}
          contentType={contentType}
          courseContent={courseContent}
          fullCourseContent={fullCourseContent}
          rest={rest}
        />
        {!courseContent?.folder && 
        ['notion', 'video'].includes(courseContent?.value?.type ?? '') && (
          <MarkCompletedButton
            courseContent={{
              id: courseContent?.value?.id || 0,
              markAsCompleted: courseContent?.value?.videoProgress?.markAsCompleted ?? false,
              type: courseContent?.value?.type ?? '',
              notesProgress: courseContent?.value?.notesProgress?.isCompleted ?? false,
            }}
          />
        )}
      </div>

      {!courseContent?.folder && courseContent?.value.type === 'notion' ? (
        <NotionRenderer id={courseContent?.value?.id?.toString()} />
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
            bookmark: courseContent?.value.bookmark || null,
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
          courseContent={courseContent?.value.map((x: any) => {
            let contentCompletionStatus = false;
            if (x?.type === 'notion') {
              console.log(x.notesProgress.isCompleted);
              contentCompletionStatus = x.notesProgress.isCompleted;
            } else if (x.type === 'video') {
              contentCompletionStatus = x.videoProgress.markAsCompleted;
            }
            console.log("map");

            return ({
            title: x?.title || '',
            image: x?.thumbnail || '',
            type: x?.type || 'folder',
            id: x?.id || 0,
            markAsCompleted: contentCompletionStatus,
            percentComplete: getFolderPercentCompleted(x?.children),
            videoFullDuration: x?.videoProgress?.videoFullDuration || 0,
            duration: x?.videoProgress?.duration || 0,
            bookmark: x.bookmark || null,
          });
        })}
          courseId={parseInt(course.id, 10)}
        />
      ) : null}
    </div>
  );
};
