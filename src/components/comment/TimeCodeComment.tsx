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
    const parts = timeCode.split(':').map(Number);
    while (parts.length < 3) {
      parts.unshift(0);
    }
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const timeCodeRegex = /\b(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\b/g;

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
          className="text-blue-500 hover:underline"
          href={getUpdatedUrl(`/courses/${possiblePath}`, searchParams, {
            timestamp: timeInSeconds,
          })}
        >
          {match[0]}
        </Link>,
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
