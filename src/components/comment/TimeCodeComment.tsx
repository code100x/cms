import { QueryParams } from '@/actions/types';
import { getUpdatedUrl } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type TimeCodeCommentProps = {
  comment: string;
  possiblePath: string;
  searchParams: QueryParams;
};

const TimeCodeComment: React.FC<TimeCodeCommentProps> = ({
  comment,
  possiblePath,
  searchParams,
}) => {
  const convertToSeconds = (timeCode: string): number => {
    const parts = timeCode.split(':').reverse().map(Number);
    return (parts || []).reduce(
      (acc, part, index) => acc + part * Math.pow(60, index),
      0,
    );
  };

  const timeCodeRegex = /(?:(\d{1,2}):)?(\d{1,2}):(\d{1,2})/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g; // Regular expression to detect URLs

  const processLine = (line: string) => {
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = timeCodeRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>
            {line.substring(lastIndex, match.index)}
          </span>,
        );
      }

      const timeInSeconds = convertToSeconds(match[0]);
      elements.push(
        <Link
          key={`timecode-${match.index}`}
          href={getUpdatedUrl(`/courses/${possiblePath}`, searchParams, {
            timestamp: timeInSeconds,
          })}
        >
          <a
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[0]}
          </a>
        </Link>,
      );

      lastIndex = match.index + match[0].length;
    }

    // Check for URLs in the remaining text
    while ((match = urlRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>
            {line.substring(lastIndex, match.index)}
          </span>,
        );
      }

      elements.push(
        <a
          key={`url-${match.index}`}
          href={match[1]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {match[1]}
        </a>,
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      elements.push(
        <span key={`text-end-${lastIndex}`}>{line.substring(lastIndex)}</span>,
      );
    }

    return elements;
  };

  return (
    <p className="break-all">
      {comment.split('\n').map((line, index) => (
        <React.Fragment key={`line-${index}`}>
          {processLine(line)}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default TimeCodeComment;
