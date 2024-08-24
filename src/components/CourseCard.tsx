'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const CourseCard = ({
  course,
  buttonColor,
}: {
  course: Course;
  onClick?: () => void;
  buttonColor?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={`rounded-sm border border-gray-200 bg-secondary shadow dark:border dark:border-gray-700/50 dark:bg-[#0F172A]`}
      // onClick={() => {
      //   onClick();
      // }}
    >
      {/* <img src={course.imageUrl} alt={course.title} className="rounded-sm" /> */}

      <div className="flex h-full flex-col justify-between space-y-4 p-4">
        {/* <div className="flex justify-between">
          <div className="text-xl font-semibold">{course.title}</div>
        </div> */}

        <div className="space-y-4">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full rounded-sm object-cover"
          />
          {course.totalVideos !== undefined ? (
            <PercentageComplete
              percent={Math.ceil(
                ((course.totalVideosWatched ?? 0) / course.totalVideos) * 100,
              )}
            />
          ) : (
            <PercentageComplete percent={0} />
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <div className="">{course.title} Cohort</div>
          <div className="flex w-full items-center justify-between text-sm text-foreground/60">
            {true && (
              <Link
                target={'blank'}
                href={'/certificate'}
                className="hover:text-foreground hover:underline"
              >
                Certificate
              </Link>
            )}
            {true && (
              <Link
                target={'blank'}
                href={course.discordOauthUrl}
                className="hover:text-foreground hover:underline"
              >
                Discord
              </Link>
            )}
          </div>
          <button
            type="button"
            className="w-full rounded-sm bg-blue-700 px-5 py-2 text-center text-sm text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            style={{
              backgroundColor: buttonColor,
            }}
            onClick={() => {
              if (
                course.title.includes('Machine Learning') ||
                course.title.includes('Harnoor')
              ) {
                router.push('https://harkirat.classx.co.in/');
              } else {
                router.push(`/courses/${course.id}`);
              }
            }}
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
      <div className="h-64 rounded-sm bg-slate-50 dark:bg-slate-900"></div>
    </div>
  );
};
