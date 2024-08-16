'use client';
import { Course } from '@/store/atoms';
import { useRouter } from 'next/navigation';
import { onEnterOrSpaceKeyDown } from '@/lib/utils';
import Badge from './Badge';
import PercentageCompleteV2 from './PercentageCompleteV2';
import ButtonV2 from './buttons/ButtonV2';
import { LuUsers2 } from 'react-icons/lu';

const CourseCardV2 = ({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) => {
  const {
    description,
    discordOauthUrl,
    title,
    totalVideos,
    totalVideosWatched,
  } = course;
  const router = useRouter();

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => onEnterOrSpaceKeyDown(e, onClick)}
      className="rounded-lg border hover:bg-[#E2E8F0] focus-visible:bg-[#E2E8F0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 dark:hover:bg-[#0F172A] dark:focus:bg-[#0F172A]"
    >
      <img
        src={'https://placehold.co/1600x900'} // Comment before merge
        // src={imageUrl} // Un comment this before merge
        alt={title}
        className="aspect-video rounded-t-lg"
      />
      <div className="flex flex-col gap-4 px-7 py-5">
        <div className="flex flex-col gap-2">
          <Badge title={description} />
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <PercentageCompleteV2
          percentage={
            totalVideos && totalVideosWatched
              ? Math.ceil((totalVideosWatched / totalVideos) * 100)
              : 0
          }
        />
        <ButtonV2
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Content
        </ButtonV2>
        {discordOauthUrl && (
          <ButtonV2
            onClick={(e) => {
              e.stopPropagation();
              router.push(discordOauthUrl);
            }}
            className={
              'flex items-center justify-center gap-2 bg-transparent text-[#94A3B8] hover:bg-transparent focus-visible:bg-transparent'
            }
          >
            <LuUsers2 />
            Join Discord Community
          </ButtonV2>
        )}
      </div>
    </div>
  );
};

export default CourseCardV2;
