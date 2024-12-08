'use client';
import { Segment, formatTime } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import videojs from 'video.js';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const chaptersVariants = {
  open: {
    width: '100%',
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
  closed: {
    width: 0,
    opacity: 0,
    y: -20,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
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
        className="flex w-full flex-col"
      >
        <div className="flex w-full flex-wrap gap-2">
          {(segments as Segment[])?.map(({ start, end, title }, index) => {
            return (
              <TooltipProvider>
                <Tooltip>
                  <div key={`${index}-${start}${end}${title}`}>
                    <div
                      className={`flex max-w-64 cursor-pointer items-center justify-between gap-2 rounded-lg p-4 transition-all duration-300 hover:bg-primary/10 ${currentTime >= start && currentTime < end ? 'bg-blue-500/10' : 'bg-primary/5'}`}
                      onClick={() => {
                        player.currentTime(start);
                        player.play();
                      }}
                    >
                      <TooltipTrigger asChild>
                        <p className="truncate font-medium tracking-tight">{title}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{title}</p>
                      </TooltipContent>
                      <span className="rounded-full bg-blue-500/20 px-2 py-1 font-medium text-blue-500">
                        {formatTime(start)}
                      </span>
                    </div>
                  </div>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default VideoContentChapters;
