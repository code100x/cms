'use client';
import { Segment, formatTime } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import videojs from 'video.js';

const VideoContentChapters = ({
  segments,
  onCancel,
}: {
  segments: any;
  onCancel: () => void;
}) => {
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const allPlayers = videojs.getAllPlayers();
    const activePlayer = allPlayers[0];
    setPlayer(activePlayer);
  }, []);

  useEffect(() => {
    if (player) {
      const intervalId = setInterval(() => {
        setCurrentTime(player.currentTime());
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [player]);

  return (
    <div className="w-full overflow-hidden rounded-md border text-sm shadow-md xl:block xl:w-1/4">
      <div className="border-muted-background flex w-full items-center justify-between border-b bg-background px-4 py-3">
        <span>Chapter</span>
        <X onClick={onCancel} className="h-5 w-5 cursor-pointer" />
      </div>
      <div className="max-h-[70vh] overflow-auto">
        {(segments as Segment[])?.map(({ start, end, title }, index) => {
          return (
            <div key={`${index}-${start}${end}${title}`}>
              <div
                className={`flex cursor-pointer items-center justify-between gap-3 p-2 py-3 text-black hover:bg-secondary dark:text-white ${currentTime >= start && currentTime < end ? 'bg-secondary' : ''}`}
                onClick={() => {
                  player.currentTime(start);
                  player.play();
                }}
              >
                <span>{title}</span>
                <div className="rounded bg-[#ffffff] px-1.5 py-0.5 text-[#040fff] dark:bg-[#263850] dark:text-[#37A4FF]">
                  {formatTime(start)}
                </div>
              </div>
              {index !== segments.length - 1 && <hr />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoContentChapters;
