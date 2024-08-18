'use client';
import { Course } from '@/store/atoms';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { UsersRound } from 'lucide-react';

export const CourseCard = ({
  course,
  onClick,
  buttonColor,
  roundedCardSize,
}: {
  course: Course;
  onClick: () => void;
  buttonColor: string;
  roundedCardSize: 'lg' | 'xl' | '2xl' | '3xl';
}) => {
  const roundedClassNames = {
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const roundedClassName = roundedClassNames[roundedCardSize] || 'rounded-lg';
  const [progress, setProgress] = useState(0);
  function UpdateProgress() {
    if (
      course.totalVideos !== undefined &&
      course.totalVideosWatched !== undefined
    ) {
      const value = Math.ceil(
        (course.totalVideosWatched / course.totalVideos) * 100,
      );

      setProgress(value);
    }
  }

  useEffect(() => {
    UpdateProgress();
  }, []);
  console.log(course);
  return (
    <div
      className={`max-w-sm border border-gray-200 bg-white ${roundedClassName} mx-auto w-full shadow dark:border-gray-700 dark:bg-gray-800`}
      onClick={() => {
        onClick();
      }}
    >
      <img
        src={
          'https://res.cloudinary.com/shobhit2205/image/upload/v1723808127/FIxed_Aspect_Ratio_qfglzl.png'
        }
        alt={course.title}
        className="w-full rounded-t-md"
      />

      <div className="p-2">
        <div className="w-fit rounded-full bg-blue-600 px-2 text-sm font-medium text-white">
          Cohort 3.0
        </div>
        <div className="flex justify-between">
          <div className="mt-2 font-bold">{course.title} Cohort</div>
        </div>

        <div className="mb-4 flex flex-col gap-2 rounded-full">
          <div className="flex justify-end font-sans font-medium text-gray-500">
            {progress}%
          </div>
          <Progress value={progress} className="h-2 bg-green-100" />
        </div>
        <div>
          <button
            type="button"
            className="mb-2 me-2 w-full rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            style={{
              backgroundColor: buttonColor,
            }}
          >
            View Content
          </button>
          {course.discordOauthUrl && (
            <div className="flex">
              <Link
                target={'blank'}
                href={course.discordOauthUrl}
                className="flex h-12 w-full items-center justify-center gap-2 text-center font-sans text-base font-medium text-gray-500"
              >
                <UsersRound size={20} />
                Join Discord Community
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 rounded-md bg-slate-50 dark:bg-slate-900"></div>
    </div>
  );
};
