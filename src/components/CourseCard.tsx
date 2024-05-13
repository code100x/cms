'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from '@/components/PercentageComplete';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { SecondaryButton } from '@/components/buttons/SecondaryButton';
import { useRouter } from 'next/navigation';

export const CourseCard = ({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) => {
  const router = useRouter();
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto w-full"
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
