'use client';
import { Course } from '@/store/atoms';
import { UsersRound } from 'lucide-react';
import PercentageComplete from './PercentageComplete';
import { SecondaryButton } from './buttons/SecondaryButton';
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
      className={`max-w-sm border border-gray-200 bg-white ${roundedClassName} w-full shadow dark:border dark:border-gray-700/50 dark:bg-[#0F172A]`}
      onClick={() => {
        onClick();
      }}
    >
      <img src={course.imageUrl} alt={course.title} className="rounded-md" />

      <div className="space-y-4 p-2">
        <div className="flex justify-between">
          <div className="text-xl font-semibold">{course.title}</div>
        </div>

        <div>
          {course.totalVideos !== undefined && (
            <PercentageComplete
              percent={Math.ceil(
                ((course.totalVideosWatched ?? 0) / course.totalVideos) * 100,
              )}
            />
          )}
        </div>

        <div>
          <button
            type="button"
            className="mb-2 me-2 w-full rounded-full bg-blue-700 px-5 py-2 text-center text-sm text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            style={{
              backgroundColor: buttonColor,
            }}
          >
            View Content
          </button>
          <div className="flex">
            {course.certIssued && (
              <div className="flex-1 pr-2">
                <SecondaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/certificate');
                  }}
                >
                  Certificate
                </SecondaryButton>
              </div>
            )}
            {/* {course.discordOauthUrl && (
              <div className="flex-1">
                <Link target={'blank'} href={course.discordOauthUrl}>
                  <SecondaryButton
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Discord
                  </SecondaryButton>
                </Link>
              </div>
            )} */}
            {true && (
              <div className="mt-2 flex-1">
                <Link target={'blank'} href={course.discordOauthUrl}>
                  <div className="flex w-full flex-row justify-center gap-2">
                    <UsersRound size={18} color="#94A3B8" />
                    <div className="text-sm text-[#94A3B8]">
                      Join Discord Community
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
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
