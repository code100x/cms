'use client';

import { Course } from '@/store/atoms';
import { FC } from 'react';
import { HiUsers } from 'react-icons/hi';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export const CourseCard: FC<CourseCardProps> = ({ course, onClick }) => {
  const percentComplete = Math.ceil(
    (course.totalVideosWatched / course.totalVideos) * 100,
    // (course.totalVideosWatched / course.totalVideos) * 100,
  );

  return (
    <div
      className="w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-border bg-background shadow-lg transition hover:bg-slate-200 dark:hover:bg-gray-900"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="rounded-full bg-[#3662E3] px-3 py-1 text-white">
            Cohort 3.0
          </span>
        </div>

        <h2 className="text-2xl font-bold capitalize">{course.title}</h2>

        <div>
          <span className="text-sm text-green-400">
            {percentComplete || 0}% Completed
          </span>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#393939]">
            <div
              className="h-full bg-green-400"
              style={{ width: `${percentComplete || 0}%` }}
            ></div>
          </div>
        </div>

        <button className="w-full rounded-3xl bg-[#3662E3] py-2 text-white transition duration-300 hover:bg-[#2D52C3]">
          View Content
        </button>

        <button
          className="flex w-full items-center justify-center rounded-md py-2 text-gray-400 transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // Handle Discord join logic
          }}
        >
          <HiUsers className="mr-2" />
          Join Discord Community
        </button>
      </div>
    </div>
  );
};

export const CourseSkeleton: FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 rounded-2xl bg-gray-700"></div>
    </div>
  );
};
