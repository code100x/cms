'use client';

import { ContentCard } from '@/components/ContentCard';
import { TWatchHistory } from '../app/history/page';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';

const WatchHistoryClient = ({ history }: { history: TWatchHistory[] }) => (
  <Carousel>
    <CarouselContent>
      {history.map((progress) => (
        <CarouselItem
          className="basis-1/2 md:basis-1/3 lg:basis-1/5"
          key={progress.id}
        >
          <HistoryCard {...progress} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselNext />
  </Carousel>
);

const HistoryCard = ({
  id,
  contentId,
  currentTimestamp,
  videoDuration,
  content: { type, title, thumbnail, hidden, parent },
}: TWatchHistory) => {
  const router = useRouter();

  if (parent && !hidden && type === 'video') {
    const { id: folderId, courses } = parent;
    const courseId = courses[0].courseId;
    const videoUrl = `/courses/${courseId}/${folderId}/${contentId}`;
    const videoProgressPercent = Math.round(
      (currentTimestamp / videoDuration) * 100,
    );
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
