'use client';
import { Course } from '@/store/atoms';
import { UsersRound } from 'lucide-react';
import PercentageComplete from './PercentageComplete';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  const router = useRouter();
  return (
    <div
      className={`flex max-w-sm flex-col border border-gray-200 bg-white max-sm:max-w-full ${roundedClassName} w-full shadow transition-colors duration-300 ease-in-out hover:bg-[#E2E8F0] dark:border dark:border-gray-700/50 dark:bg-[#020817] hover:dark:bg-[#1E293B]`}
      onClick={onClick}
    >
      <img
        alt={course.title}
        className="rounded-t-2xl bg-cover"
        src={course.imageUrl}
      />
      {/* add tag here */}
      {/* <div>Cohort 3.0</div> */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="text-xl font-semibold capitalize">{course.title}</div>
        {course.totalVideos !== undefined && (
          <PercentageComplete
            percent={Math.ceil(
              ((course.totalVideosWatched ?? 0) / course.totalVideos) * 100,
            )}
          />
        )}
        <div className="flex flex-col gap-4">
          <button
            className="w-full rounded-full bg-blue-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            style={{ backgroundColor: buttonColor }}
            type="button"
          >
            View Content
          </button>
          {course.certIssued ? (
            <div className="flex-1 pr-2">
              <div
                className="text-center text-base font-medium text-[#64748B] dark:text-[#94A3B8]"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/certificate');
                }}
              >
                Claim Certificate
              </div>
            </div>
          ) : (
            <Link
              className="flex w-full flex-row items-center justify-center gap-2"
              href={course.discordOauthUrl}
              target={'blank'}
            >
              <UsersRound size={16} color="#94A3B8" />
              <div className="text-base font-medium text-[#64748B] dark:text-[#94A3B8]">
                Join Discord Community
              </div>
            </Link>
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
