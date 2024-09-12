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
            <Button variant="link" size={'lg'}>
              <Link href={course.discordOauthUrl} target={'blank'}>
                Join Discord
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 rounded-md bg-primary/10"></div>
    </div>
  );
};
