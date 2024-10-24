import { UpdateVideoClient } from '@/components/admin/UpdateVideoClient';
import { getFullCourseContent } from '@/db/course';
import findContentById from '@/lib/find-content-by-id';
import React from 'react';

const VideoOrNotionEditPage = async ({
  params,
}: {
  params: { moduleId: string[]; courseId: string };
}) => {
  const courseId = params.courseId;
  const rest = params.moduleId;
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );
  return (
    <div>
      {/* @ts-ignore */}
        <UpdateVideoClient content={courseContent?.value}/>
    </div>
  );
};

export default VideoOrNotionEditPage;