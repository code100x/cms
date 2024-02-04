'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

export const CourseCard = ({
  course,
  onClick,
}: {
  course: Course
  onClick: () => void
}) => {
  return (
    <div
      className="max-w-full flex flex-col md:flex-row items-center bg-slate-100 md:border rounded-lg shadow-lg dark:bg-gradient-to-t md:dark:bg-gradient-to-l dark:from-slate-900 dark:to-slate-800"
      onClick={() => {
        onClick();
      }}
    >
      <div className="p-2">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="rounded-t-md md:rounded-l-md md:rounded-r-none md:max-w-md"
        />
      </div>

      <div className="px-4 md:px-6 py-2 w-full h-full">
        <div className="flex flex-col w-full h-full items-start justify-between md:py-4">
          <div className="w-full items-start mb-3">
            <h2 className="mb-0 md:mb-2 dark:text-neutral-100 text-neutral-800 text-xl sm:text-3xl font-semibold">
              {course.title} Cohort
            </h2>

            <p className="dark:text-neutral-200 text-neutral-700 font-medium">
              {course.description}
            </p>
          </div>

          <div className="w-full flex items-center justify-between pb-2 md:pb-0">
            {course.totalVideos !== undefined &&
              course.totalVideosWatched !== undefined && (
              <PercentageComplete
                percent={Math.ceil(
                  (course.totalVideosWatched / course.totalVideos) * 100,
                )}
              />
            )}

            <div className="w-full flex justify-end">
              <Button className="group">
                Explore Content
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="rounded-md bg-slate-50 dark:bg-slate-900 h-64"></div>
    </div>
  );
};
