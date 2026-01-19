"use client";
import { QueryParams } from '@/actions/types';
import React, { useEffect, useState } from 'react';
import videojs from 'video.js';

type TimeCodeCommentProps = {
  comment: string;
  possiblePath: string;
  searchParams: QueryParams;
  contentId: number;
};

const TimeCodeComment: React.FC<TimeCodeCommentProps> = ({
                                                           comment,
                                                           searchParams,
                                                         }) => {
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const {timestamp} = searchParams;

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

      return () => clearInterval(intervalId);
    }
  }, [player]);

  const isTimeStamp = (value: string) => {
    // Matches mm:ss or hh:mm:ss
    const regex = /^(\d{1,2}:)?\d{1,2}:\d{2}$/;
    return regex.test(value);
  };

  const toTimeStamp = (value: string): number => {
    const parts = value.split(":").map(Number);

    if (parts.length === 2) {
      const [m, s] = parts;
      return m * 60 + s;
    } else if (parts.length === 3) {
      const [h, m, s] = parts;
      return h * 3600 + m * 60 + s;
    }

    throw new Error("Invalid timestamp format");
  };

  const handleTimeStampClick = (value : string) => {
    const time = toTimeStamp(value);
    if (player) {
      player.currentTime(time);
     // player.play();
    }
  };

  return (
    <p className="text-wrap">
      {comment.split('\n').map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block">
      {line.split(' ').map((word, wordIndex) => (
        <span
          key={`word-${lineIndex}-${wordIndex}`}
          className={`mr-1 ${isTimeStamp(word) ? "text-blue-500 cursor-pointer" : ""}`}
          onClick={() => {
            if (isTimeStamp(word)) {
              handleTimeStampClick(word);
            }
          }}
        >
  {word}
</span>

      ))}
    </span>
      ))}
    </p>
  );
};

export default TimeCodeComment;
