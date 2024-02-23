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
    const selectedSegment = document.querySelector('.scroll-into-view');
    if (selectedSegment) {
      const parentElement = selectedSegment.parentElement?.parentElement;
      if (!parentElement) return;

      const parentRect = parentElement.getBoundingClientRect();
      const segmentRect = selectedSegment.getBoundingClientRect();

      const initialPosition = segmentRect.left - parentRect.left;
      const newPosition = initialPosition + parentElement.scrollLeft;

      const scrollLeft =
        newPosition - parentRect.width / 2 + segmentRect.width / 2;
      parentElement.scrollTo({
        behavior: 'smooth',
        left: scrollLeft,
      });
    }
  }, [currentTime]);

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
    <div className="w-75 rounded-md shadow-md border text-sm">
      <div className="flex items-center justify-between p-2 py-3 bg-[#212020]">
        <span>Chapters</span>
        <X onClick={onCancel} className="cursor-pointer" />
      </div>
      <div className="max-w-[73vw] max-h-[70vh] overflow-auto flex">
        {(segments as Segment[])?.map(({ start, end, title }, index) => {
          return (
            <div key={`${index}-${start}${end}${title}`}>
              <div
                className={`dark:text-white text-black p-2 py-3 m-2 flex flex-col items-center gap-3 justify-between cursor-pointer rounded hover:bg-[#27272A] w-40 h-40 overflow-hidden ${currentTime >= start && currentTime < end ? 'bg-[#27272A] scroll-into-view' : ''}`}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoContentChapters;
