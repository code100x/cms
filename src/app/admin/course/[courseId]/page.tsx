import React from 'react';
import { BookOpenText } from 'lucide-react';
import { getCourse, getFullCourseContent } from '@/db/course';
import findContentById from '@/lib/find-content-by-id';
import CourseEditForm from '@/components/admin/CourseEditForm';

const CourseUpdatePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const courseId = parseInt(params.courseId, 10);
  const fullCourseContent = await getFullCourseContent(courseId);
  const courseContent = findContentById(fullCourseContent, []);
  const course = await getCourse(courseId);

  const requiredFields = [
    course?.title,
    course?.description,
    course?.discordRoleId,
    course?.imageUrl,
    course?.slug,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((item) => item?.length).length;
  const indicator = `(${completedFields}/${totalFields})`;

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-x-2">
          <div className="flex items-center gap-x-2">
            <BookOpenText size={20} className="h-8 w-8 rounded-lg border p-2" />
            <h2 className="text-2xl font-medium">Customize Course</h2>
          </div>
          <p className="ml-10 mt-2 text-sm">Complete all fields {indicator}</p>
        </div>
      </div>
      <div className="mt-10 w-full">
        <div>
          <CourseEditForm
            course={course}
            courseId={courseId}
            courseContent={courseContent?.value}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseUpdatePage;
