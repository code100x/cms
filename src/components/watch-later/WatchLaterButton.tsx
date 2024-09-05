import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MdOutlineWatchLater } from 'react-icons/md';
import { MdWatchLater } from 'react-icons/md';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedVideoIdsState,
  watchLaterVideoData,
} from '@/store/atoms/watchlater';
import { deleteWatchLater } from '@/utiles/delete-watch-later';
import { addWatchLater } from '@/utiles/add-watch-later';
type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'center' | 'start' | 'end';

const WatchLaterButton = ({
  size = 20,
  side = 'top',
  align = 'end',
  contentId,
}: {
  size?: number;
  side?: Side;
  align?: Align;
  contentId?: number;
}) => {
  const [videosData, setVideoData] = useRecoilState(watchLaterVideoData);
  const [videoId, setVideoId] = useState<any>(0);
  const [selectedVideoIds, setSelectedVideoIds] = useRecoilState(
    selectedVideoIdsState,
  );

  useEffect(() => {
    setVideoId(
      videosData.find((val) => val.content.id === contentId)?.content.id,
    );
  }, [videosData]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            // disabled={isDisabled}
            variant="ghost"
            className="h-0 p-0 text-primary hover:text-primary"
            onClick={async (e) => {
              e.stopPropagation();

              if (videoId === contentId && contentId !== undefined) {
                await deleteWatchLater(
                  contentId,
                  setSelectedVideoIds,
                  setVideoData,
                );
              } else if (contentId !== undefined) {
                await addWatchLater(contentId, setVideoData);
                setSelectedVideoIds((prev) => [...prev, contentId]);
              }
            }}
          >
            {videoId === contentId ? (
              <MdWatchLater
                size={size}
                //   {...(addedBookmark && { fill: '#2563EB' })}
                className="text-white drop-shadow-2xl"
              />
            ) : (
              <MdOutlineWatchLater
                size={size}
                //   {...(addedBookmark && { fill: '#2563EB' })}
                className="text-white drop-shadow-2xl"
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={16} side={side} align={'end'}>
          {/* <p>{addedBookmark ? 'Remove bookmark' : 'Bookmark this video'}</p> */}
          <p>Watch Later</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WatchLaterButton;
