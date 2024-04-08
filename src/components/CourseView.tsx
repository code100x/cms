import { Folder } from '@/db/course';
import { ContentRenderer } from './admin/ContentRenderer';
import { FolderView } from './FolderView';
import { Sidebar } from './Sidebar';
import { NotionRenderer } from './NotionRenderer';
import { getFolderPercentCompleted } from '@/lib/utils';
import Comments from './comment/Comments';
import { QueryParams } from '@/actions/types';
import BreadCrumbComponent from './BreadCrumbComponent';
import LayoutToggle from './LayoutToggle';

export const CourseView = ({
  rest,
  course,
  fullCourseContent,
  courseContent,
  nextContent,
  contentType,
  searchParams,
  possiblePath,
}: {
  fullCourseContent: Folder[];
  rest: string[];
  course: any;
  courseContent: any;
  nextContent: any;
  contentType: any;
  searchParams: QueryParams;
  possiblePath: string;
}) => {
  return (
    <div className="flex h-full">
      <Sidebar fullCourseContent={fullCourseContent} courseId={course.id} />
      <div className="grow p-2 overflow-y-auto no-scrollbar">
        <div className=" min-h-[2.5rem] max-h-fit mb-2 flex justify-between items-center px-4">
          <BreadCrumbComponent
            course={course}
            contentType={contentType}
            courseContent={courseContent}
            fullCourseContent={fullCourseContent}
            rest={rest}
          />

          {contentType === 'folder' ? <LayoutToggle /> : null}
        </div>

        {contentType === 'notion' ? (
          <NotionRenderer id={courseContent[0]?.id} />
        ) : null}

        {contentType === 'video' ? (
          <ContentRenderer
            nextContent={nextContent}
            content={{
              thumbnail: courseContent[0]?.thumbnail || '',
              id: courseContent[0]?.id || 0,
              title: courseContent[0]?.title || '',
              type: contentType || 'video',
              description: courseContent[0]?.description || '',
              markAsCompleted:
                courseContent[0]?.videoProgress?.markAsCompleted || false,
              bookmark: courseContent[0].bookmark,
            }}
          />
        ) : null}
        {(contentType === 'video' || contentType === 'notion') && (
          <Comments
            content={{
              id: courseContent[0]?.id || 0,
              commentCount: courseContent[0]?.commentsCount || 0,
              possiblePath,
            }}
            searchParams={searchParams}
          />
        )}
        {contentType === 'folder' ? (
          <FolderView
            rest={rest}
            courseContent={courseContent?.map((x: any) => ({
              title: x?.title || '',
              image: x?.thumbnail || '',
              type: x?.type || 'folder',
              id: x?.id || 0,
              markAsCompleted: x?.videoProgress?.markAsCompleted || false,
              percentComplete: getFolderPercentCompleted(x?.children),
              videoFullDuration: x?.videoProgress?.videoFullDuration || 0,
              duration: x?.videoProgress?.duration || 0,
            }))}
            courseId={parseInt(course.id, 10)}
          />
        ) : null}
      </div>
    </div>
  );
};
