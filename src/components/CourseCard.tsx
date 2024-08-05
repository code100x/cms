'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
import { useRouter } from 'next/navigation';
import CardComponent from './CardComponent';
import Link from 'next/link';
import { Button } from './ui/button';

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
      className={`mx-auto flex min-h-[35vh] w-full flex-col gap-4 rounded-2xl bg-blue-400/40 p-2 shadow-blue-600/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-blue-950/80 md:max-w-sm`}
      onClick={() => {
        onClick();
      }}
    >
      {course.imageUrl === null ? (
        <img
          src={course.imageUrl}
          // src="https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/video.png"
          alt={course.title}
          className="rounded-2xl"
        />
      ) : (
        <CardComponent type="course" title={course.title} />
      )}

      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-2 text-wrap font-bold capitalize tracking-tighter">
            {course.title} Cohort
          </h3>
          {course.totalVideos !== undefined &&
            course.totalVideosWatched !== undefined && (
              <PercentageComplete
                percent={Math.ceil(
                  (course.totalVideosWatched / course.totalVideos) * 100,
                )}
              />
            )}
        </div>
        <div className="flex justify-between gap-2">
          {course.discordOauthUrl && (
            <Link
              className="w-full"
              target={'blank'}
              href={course.discordOauthUrl}
            >
              <Button
                className="w-full"
                variant={'secondary'}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span className="text-foreground">Discord</span>
              </Button>
            </Link>
          )}
          {course.certIssued && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push('/certificate');
              }}
              type="button"
              className="w-full"
              variant={'outline'}
            >
              <span className="flex items-center gap-1 text-foreground">
                Certificate
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="my-32 animate-pulse">
      <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-700"></div>
    </div>
  );
};
