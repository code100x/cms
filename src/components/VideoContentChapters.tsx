'use client';
import { Segment, formatTime } from '@/lib/utils';
import { useEffect, useState } from 'react';
import videojs from 'video.js';

const VideoContentChapters = ({ segments }: { segments: any }) => {
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
    <div className="overflow-auto w-full lg:w-1/3 rounded-md shadow-md border text-sm">
      {(segments as Segment[]).map(({ start, end, title }, index) => {
        return (
          <>
            <div
              className={`p-2 py-3 flex items-center gap-3 justify-between cursor-pointer ${currentTime >= start && currentTime < end ? 'bg-[#27272A]' : ''}`}
              onClick={() => {
                player.currentTime(start);
                player.play();
              }}
            >
              <span>{title}</span>
              <div className="bg-[#263850] text-[#37A4FF] px-1.5 py-0.5 rounded">
                {formatTime(start)}
              </div>
            </div>
            {index !== segments.length - 1 && <hr />}
          </>
        );
      })}
    </div>
  );
};

export default VideoContentChapters;
