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
    <div className="w-full rounded-md border text-sm shadow-md xl:w-[500px]">
      <div className="flex items-center justify-between bg-[#F5F5F5] p-2 py-3 dark:bg-[#212020]">
        <span>Chapters</span>
        <X onClick={onCancel} className="cursor-pointer" />
      </div>
      <div className="max-h-[70vh] overflow-auto">
        {(segments as Segment[])?.map(({ start, end, title }, index) => {
          return (
            <div key={`${index}-${start}${end}${title}`}>
              <div
                className={`flex cursor-pointer items-center justify-between gap-3 p-2 py-3 text-black dark:text-white ${currentTime >= start && currentTime < end ? 'bg-zinc-200 dark:bg-[#27272A]' : ''}`}
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
