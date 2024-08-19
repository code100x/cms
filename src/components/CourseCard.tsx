'use client';
import { Course } from '@/store/atoms';
import PercentageComplete from './PercentageComplete';
import { SecondaryButton } from './buttons/SecondaryButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Scroll, UsersRound } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

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

  const generateProgressPercentage = () => {
    if (course.totalVideos === undefined || course.totalVideosWatched === undefined) {
      return 0;
    }
    return Math.ceil((course.totalVideosWatched / course.totalVideos) * 100);
  }

  return (
    <div
      className={`max-w-sm border bg-white ${roundedClassName} mx-auto w-full shadow dark:hover:bg-[#0F172A] dark:border-gray-700 dark:bg-[#020817]`}
      onClick={() => {
        onClick();
      }}
    >
      {/* <div className="relative">
        {course.totalVideos !== undefined &&
          course.totalVideosWatched !== undefined && (
            <PercentageComplete
              percent={Math.ceil(
                (course.totalVideosWatched / course.totalVideos) * 100,
              )}
            />
          )}
      </div> */}
      <img src={course.imageUrl} alt={course.title} className="rounded-t-lg" />

      <div className="px-3 flex flex-col py-2">
        <div>
          <Badge className='bg-blue-500 text-white'>Premium</Badge>
        </div>
        <div className="flex justify-between my-2">
          <div className="font-semibold flex-1 text-xl">{course.title} Cohort</div>
        </div>


        <div className='mb-4 flex flex-col gap-2'>
          <p className='text-[#94A3B8] text-sm flex items-center justify-end'>{generateProgressPercentage()}%</p>
          <Progress className='h-[0.5rem]' value={generateProgressPercentage()} />
        </div>

        <div>
          <button
            type="button"
            className="mb-2 me-2 w-full rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800"
            style={{
              backgroundColor: buttonColor,
            }}
          >
            View Content
          </button>
          <div className="flex flex-col">
            {course.certIssued && (
              <div className="flex-1 pr-2">
                <SecondaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/certificate');
                  }}
                >
                  <div className='flex items-center hover:underline justify-center gap-2 w-full h-full'>
                    <Scroll color='#94A3B8' size={18} />
                    <p>Certificate</p>
                  </div>
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
                    <div className='flex items-center hover:underline justify-center gap-2 w-full h-full'>
                      <UsersRound color='#94A3B8' size={18} />
                      <p>Join Discord Community</p>
                    </div>
                  </SecondaryButton>
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
