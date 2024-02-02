'use client';
import { Course } from '@/store/atoms';

export const CourseCard = ({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) => {
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onClick={() => {
        onClick();
      }}
    >
      <img src={course.imageUrl} alt={course.title} className="rounded-md" />
      <div className="p-2">
        <div className="flex justify-between">
          <div className="mt-4 mb-2">{course.title} Cohort</div>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
          >
            View Content
          </button>
        </div>
      </div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="rounded-md bg-gray-400 h-56"></div>
      <div className="flex-1 space-y-4 py-2">
        <div className="space-y-6">
          <div className="h-4 bg-gray-400 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};
