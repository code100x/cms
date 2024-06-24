'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
import { SecondaryButton } from './buttons/SecondaryButton';
import { useRouter } from 'next/navigation';

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
      className={`max-w-sm border border-gray-200 bg-white ${roundedClassName} mx-auto w-full shadow dark:border-gray-700 dark:bg-gray-800`}
      onClick={() => {
        onClick();
      }}
    >
      <div className="relative">
        {course.totalVideos !== undefined &&
          course.totalVideosWatched !== undefined && (
            <PercentageComplete
              percent={Math.ceil(
                (course.totalVideosWatched / course.totalVideos) * 100,
              )}
            />
          )}
      </div>
      <img src={course.imageUrl} alt={course.title} className="rounded-md" />
      <div className="p-2">
        <div className="flex justify-between">
          <div className="mb-2 mt-4">{course.title} Cohort</div>
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
          {course.certIssued && (
            <SecondaryButton
              onClick={(e) => {
                e.stopPropagation();
                router.push('/certificate');
              }}
            >
              Download Certificate
            </SecondaryButton>
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
