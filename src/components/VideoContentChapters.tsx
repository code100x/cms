'use client';
import { Segment, formatTime } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import videojs from 'video.js';

const chaptersVariants = {
  open: {
    width: '100%',
    opacity: 1,
    y: 0,
  },
  closed: {
    width: 0,
    opacity: 0,
    y: -20,
  },
};

const VideoContentChapters = ({
  segments,
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
    <>
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={chaptersVariants}
        className="flex w-full flex-col gap-2"
      >
        {(segments as Segment[])?.map(({ start, end, title }, index) => {
          return (
            <div key={`${index}-${start}${end}${title}`}>
              <div
                className={`flex cursor-pointer flex-col gap-2 p-4 transition-all duration-300 hover:bg-blue-500/10 ${currentTime >= start && currentTime < end ? 'bg-blue-500/5' : ''}`}
                onClick={() => {
                  player.currentTime(start);
                  player.play();
                }}
              >
                <p className="line-clamp-1 text-lg font-medium">{title}</p>
                <span className="w-fit rounded-full bg-blue-500/20 px-2 py-1 text-sm text-blue-50">
                  {formatTime(start)}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
};

export default VideoContentChapters;
