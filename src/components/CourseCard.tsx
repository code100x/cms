'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
/* import { useRouter } from 'next/navigation'; */
import Link from 'next/link';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
/* import { SecondaryButton } from './buttons/SecondaryButton'; */

export const CourseCard = ({
  course,
  onClick,
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

  const roundedClassName = roundedClassNames[roundedCardSize] || 'rounded-2xl';
  /*  const router = useRouter(); */
  const percent = course.totalVideos
    ? Math.ceil((course.totalVideosWatched || 0 / course.totalVideos) * 100)
    : 100;
  return (
    <div
      className={`max-w-sm border shadow ${roundedClassName} w-full hover:bg-slate-200 dark:hover:bg-slate-900`}
      onClick={() => {
        onClick();
      }}
    >
      <img
        src={course.imageUrl}
        alt={course.title}
        className={`${roundedClassName}`}
      />
      <div className="relative space-y-2 p-4">
        <div className="space-y-2">
          {/*todo add course.title */}
          {/* <Badge>{course.title}</Badge> */}
          <Badge className="text-xs">Cohort 3.0</Badge>
          <h1 className="text-xl font-bold">{course.description} </h1>
        </div>
        <div>
          <div className="flex w-full flex-col">
            <span className="self-end text-sm font-medium text-slate-500">
              {percent}%
            </span>
            <PercentageComplete percent={percent} />
          </div>
        </div>
        <div className="flex justify-between"></div>
        <div>
          <Button type="button" className="mb-6 w-full rounded-full">
            View Content
          </Button>
          {/* <div className="flex">
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
            {course.discordOauthUrl && (
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
            )}
          </div> */}

          {course.discordOauthUrl && (
            <Link target={'blank'} href={course.discordOauthUrl}>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex w-full items-center justify-center gap-2 rounded-xl text-base text-slate-500"
              >
                <Users className="h-4 w-4" />
                Join Discord Community
              </button>
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
