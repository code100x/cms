import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Player from 'video.js/dist/types/player';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface VideoJsPlayer {
  eme: () => void
}

export interface Segment {
  start: number
  end: number
  title: string
}
export const formatTime = (seconds: number): string => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return hh ? `${hh}:${String(mm).padStart(2, '0')}:${ss}` : `${mm}:${ss}`;
};

export const generateCompleteSegments = (
  userSegments: Segment[],
  videoLength: number | null,
  defaultTitle: string = 'Video about html',
): Segment[] => {
  userSegments.sort((a, b) => a.start - b.start);

  const completeSegments = [];
  let lastEnd = 0;

  if (userSegments[0]?.start > 0) {
    completeSegments.push({
      start: 0,
      end: userSegments[0].start,
      title: defaultTitle,
    });
  }
  userSegments.forEach((segment, index) => {
    completeSegments.push(segment);
    lastEnd = segment.end;

    if (
      index < userSegments.length - 1 &&
      lastEnd < userSegments[index + 1].start
    ) {
      completeSegments.push({
        start: lastEnd,
        end: userSegments[index + 1].start,
        title: defaultTitle,
      });
    }
  });
  if (videoLength === null || lastEnd < videoLength) {
    completeSegments.push({
      start: lastEnd,
      end: videoLength !== null ? videoLength : Infinity,
      title: defaultTitle,
    });
  }
  return completeSegments;
};

export const createSegmentMarkerElements = (
  player: Player,
  segment: Segment,
  lastSegment: Segment,
) => {
  const segmentEnd = isFinite(segment.end)
    ? (segment.end / (player.duration() || lastSegment.end)) * 100
    : 100;

  // Create gap element
  const gapEl = document.createElement('div');
  gapEl.className = 'segment-gap absolute';
  gapEl.style.left = `${segmentEnd}%`;
  gapEl.style.height = '100%';
  gapEl.style.width = '4px';
  gapEl.style.background = '#2f3640';

  return { gapEl };
};

export const createSegmentMarkers = (player: any, allSegments: Segment[]) => {
  const seekBar = player.controlBar.progressControl.seekBar.el();
  const fragment = document.createDocumentFragment();

  seekBar
    .querySelectorAll('.segment-marker, .segment-tooltip')
    .forEach((el: HTMLElement) => el.remove());

  allSegments.forEach((segment: Segment) => {
    const { gapEl } = createSegmentMarkerElements(
      player,
      segment,
      allSegments[allSegments.length - 1],
    );

    fragment.appendChild(gapEl);
  });

  seekBar.appendChild(fragment);
};

export const createSegmentMarkersWithoutDuration = (
  player: any,
  allSegments: Segment[],
) => {
  const seekBar = player.controlBar.progressControl.seekBar.el();
  const fragment = document.createDocumentFragment();

  seekBar
    .querySelectorAll('.segment-marker, .segment-tooltip')
    .forEach((el: any) => el.remove());

  allSegments.forEach((segment) => {
    const { gapEl } = createSegmentMarkerElements(
      player,
      segment,
      allSegments[allSegments.length - 1],
    );

    fragment.appendChild(gapEl);
  });

  seekBar.appendChild(fragment);
};
export const convertTimeToSeconds = (timeStr: string): number => {
  return timeStr.split(':').reduce((acc, time) => 60 * acc + +time, 0);
};

export const getCurrentSegmentName = (
  timeStr: string,
  segments: Segment[],
): string => {
  const timeInSeconds = convertTimeToSeconds(timeStr);
  const currentSegment = segments.find(
    (segment) => segment.start <= timeInSeconds && timeInSeconds <= segment.end,
  );
  return currentSegment ? currentSegment.title : '';
};

export const handleMarkAsCompleted = async (
  markAsCompleted: boolean,
  contentId: number,
) => {
  const response = await fetch('/api/course/videoProgress/markAsCompleted', {
    body: JSON.stringify({
      markAsCompleted,
      contentId,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const getFolderPercentCompleted = (childrenContent: any) => {
  if (childrenContent && childrenContent.length > 0) {
    const videos = childrenContent.filter(
      (content: any) => content.type === 'video',
    );
    const totalVideosWatched = videos.filter(
      ({ videoProgress }: any) =>
        videoProgress && videoProgress?.markAsCompleted,
    ).length;
    return Math.ceil((totalVideosWatched / videos.length) * 100);
  }
  return null;
};
