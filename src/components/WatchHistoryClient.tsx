'use client';

import { ContentCard } from '@/components/ContentCard';
import { TWatchHistory } from '../app/history/page';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const WatchHistoryClient = ({ history }: { history: TWatchHistory[] }) => (
  <Carousel>
    <CarouselContent>
      {history.map((progress) => (
        <CarouselItem className="" key={progress.id}>
          <HistoryCard {...progress} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselNext />
    <CarouselPrevious />
  </Carousel>
);

const HistoryCard = ({
  id,
  contentId,
  currentTimestamp,
  content: { type, title, thumbnail, hidden, parent, VideoMetadata },
}: TWatchHistory) => {
  const router = useRouter();

  if (parent && !hidden && type === 'video' && VideoMetadata) {
    const { duration: videoDuration } = VideoMetadata;
    const { id: folderId, courses } = parent;
    const courseId = courses[0].courseId;
    const videoUrl = `/courses/${courseId}/${folderId}/${contentId}`;
    const videoProgressPercent = videoDuration
      ? Math.round((currentTimestamp / videoDuration) * 100)
      : 0;
    return (
      <ContentCard
        type={type}
        key={id}
        title={title}
        image={thumbnail || ''}
        onClick={() => {
          router.push(videoUrl);
        }}
        videoProgressPercent={videoProgressPercent}
        hoverExpand={false}
      />
    );
  }
};

export default WatchHistoryClient;
