'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
import { PrimaryButton } from './buttons/PrimaryButton';
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
      className={`max-w-sm bg-white border border-gray-200 ${roundedClassName} shadow dark:bg-gray-800 dark:border-gray-700 mx-auto w-full`}
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
          <div className="mt-4 mb-2">{course.title} Cohort</div>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            style={{
              backgroundColor: buttonColor,
            }}
          >
            View Content
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div
      className={`max-w-full flex flex-col md:flex-row items-center bg-slate-100 md:border rounded-${roundedCardSize} shadow-lg dark:bg-gradient-to-t md:dark:bg-gradient-to-l dark:from-slate-900 dark:to-slate-800`}
      onClick={() => {
        onClick();
      }}
    >
      <div className="relative">
        <div className="p-2">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="rounded-t-md md:rounded-l-md md:rounded-r-none md:max-w-md"
          />
        </div>
      </div>

      <div className="px-6 py-2 w-full h-full">
        <div className="flex flex-col w-full h-full items-start justify-between md:py-4">
          <div className="w-full items-start mb-3">
            <h2 className="mb-0 md:mb-2 dark:text-neutral-100 text-neutral-800 text-xl sm:text-3xl font-semibold">
              {course.title} Cohort
            </h2>

            <p className="dark:text-neutral-200 text-neutral-700 font-medium">
              {course.description}
            </p>
          </div>

          <div className="w-full flex justify-end pb-2 md:pb-0">
            <Button className="group">
              Explore Content{' '}
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
            </Button>
          </div>
          <PrimaryButton>View Content</PrimaryButton>
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
      <div className="rounded-md bg-slate-50 dark:bg-slate-900 h-64"></div>
    </div>
  );
};
