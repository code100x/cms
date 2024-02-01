import { Folder } from '@/db/course'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ContentRenderer } from './admin/ContentRenderer'
import { FolderView } from './FolderView'
import { Sidebar } from './Sidebar'
import { NotionRenderer } from './NotionRenderer'

export const CourseView = ({
  rest,
  course,
  fullCourseContent,
  courseContent,
  nextContent,
  contentType,
}: {
  fullCourseContent: Folder[]
  rest: string[]
  course: any
  courseContent: any
  nextContent: any
  contentType: any
}) => {
  return (
    <div className='flex'>
      <Sidebar fullCourseContent={fullCourseContent} courseId={course.id} />
      <div className='grow ml-64'>
        <div className='p-2'>
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
              }}
            />
          ) : null}
          {contentType === 'folder' ? (
            <FolderView
              rest={rest}
              courseContent={courseContent.map((x: any) => ({
                title: x?.title || '',
                image: x?.thumbnail || '',
                id: x?.id || 0,
              }))}
              courseId={parseInt(course.id)}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
