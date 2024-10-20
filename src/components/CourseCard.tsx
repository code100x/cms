'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
import { useRouter } from 'next/navigation';
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
  const imageUrl = course.imageUrl ? course.imageUrl : 'banner_placeholder.png';
  return (
    <div
      className={`flex w-full cursor-pointer flex-col rounded-2xl bg-primary/5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20`}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <img
          alt={course.title}
          className="size-full rounded-t-2xl bg-cover"
          src={imageUrl}
        />

        {course.totalVideos !== undefined && (
          <>
            <PercentageComplete
              percent={Math.ceil(
                ((course.totalVideosWatched ?? 0) / course.totalVideos) * 100,
              )}
            />
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex w-full justify-between gap-2">
          <h3 className="w-full truncate text-xl font-bold capitalize tracking-tighter md:text-2xl">
            {course.title}
          </h3>
          {course.totalVideos !== undefined && (
            <>
              <span
                className={`text-lg font-bold tracking-tight text-primary/80`}
              >
                {Math.ceil(
                  ((course.totalVideosWatched ?? 0) / course.totalVideos) * 100,
                )}
                %
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button size={'lg'} variant={'branding'} onClick={onClick}>
            View Course
          </Button>

          {course.certIssued ? (
            <Button
              variant="link"
              size={'lg'}
              onClick={(e) => {
                e.stopPropagation();
                router.push('/certificate');
              }}
            >
              Claim Certificate
            </Button>
          ) : (
            <Link
              className="inline-flex items-center justify-center rounded-md py-2 text-sm font-medium text-primary underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              href={course.discordOauthUrl}
              target={'blank'}
            >
              Join Discord
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
