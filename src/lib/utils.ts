import { TabType, QueryParams } from '@/actions/types';
import { CommentType, Prisma } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Player from 'video.js/dist/types/player';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface VideoJsPlayer {
  eme: () => void;
}

export interface Segment {
  start: number;
  end: number;
  title: string;
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
  return (timeStr || '').split(':').reduce((acc, time) => 60 * acc + +time, 0);
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
export const handleMarkNotesAsCompleted = async (
  isCompleted: boolean,
  contentId: number,
) => {
  const response = await fetch('/api/notesProgress', {
    body: JSON.stringify({
      isCompleted,
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

interface RateLimiter {
  timestamps: Date[];
}
const userRateLimits = new Map<string, RateLimiter>();
const RATE_LIMIT_COUNT = 5; // Nums of comment s allowed in the interval
const RATE_LIMIT_INTERVAL = 60000; // Interval in milliseconds (1 minute)

export const rateLimit = (userId: string): boolean => {
  const now = new Date();
  const userLimiter = userRateLimits.get(userId) ?? { timestamps: [] };

  userLimiter.timestamps = userLimiter.timestamps.filter(
    (timestamp) => now.getTime() - timestamp.getTime() < RATE_LIMIT_INTERVAL,
  );

  if (userLimiter.timestamps.length >= RATE_LIMIT_COUNT) {
    return false; // Rate limit exceeded
  }

  userLimiter.timestamps.push(now);
  userRateLimits.set(userId, userLimiter);
  return true;
};

export const getUpdatedUrl = (
  path: string,
  prevQueryParams: QueryParams,
  newQueryParams: QueryParams,
) => {
  const updatedQuery = { ...prevQueryParams, ...newQueryParams };
  const queryString = new URLSearchParams(
    updatedQuery as Record<string, string>,
  ).toString();
  return `${path}?${queryString}`;
};

export const searchParamsToObject = (
  searchParams: URLSearchParams,
): Record<string, string | string[]> => {
  const obj: Record<string, string | string[]> = {};
  searchParams.forEach((value, key) => {
    // If the key already exists, transform into an array or push to existing array
    // todo remove eslint-disable
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        (obj[key] as string[]).push(value);
      } else {
        obj[key] = [obj[key] as string, value];
      }
    } else {
      // Add the key-value pair
      obj[key] = value;
    }
  });
  return obj;
};

export const paginationData = (searchParams: QueryParams) => {
  const pageNumber = parseInt((searchParams.page || 1).toString(), 10);
  const pageSize = Math.min(
    parseInt((searchParams.limit || 30).toString(), 10) || 100,
  );
  const skip = (pageNumber - 1) * pageSize;

  return {
    pageNumber,
    pageSize,
    skip,
  };
};
interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  skip: number;
}
export type Delete = {
  message: string;
};
export const constructCommentPrismaQuery = (
  searchParams: QueryParams,
  paginationInfo: PaginationInfo,
  contentId: number,
  userId: string,
): Prisma.CommentFindManyArgs => {
  const { pageSize, skip } = paginationInfo;
  const { tabtype, type } = searchParams;

  let orderBy: Prisma.Enumerable<Prisma.CommentOrderByWithRelationInput> = {};
  switch (tabtype) {
    case TabType.mu:
      orderBy = { upvotes: 'desc' };
      break;
    case TabType.md:
      orderBy = { downvotes: 'desc' };
      break;
    case TabType.mr:
      orderBy = { createdAt: 'desc' };
      break;
    default:
      orderBy = { upvotes: 'desc' };
  }

  const where: Prisma.CommentWhereInput = {};
  if (contentId) {
    where.contentId = contentId;
  }
  if (searchParams.parentId) {
    where.parentId = parseInt(searchParams.parentId.toString(), 10);
  } else {
    where.parent = null;
  }
  if (type === CommentType.INTRO) {
    where.commentType = type;
  }
  const query: Prisma.CommentFindManyArgs = {
    where,
    orderBy,
    skip,
    take: pageSize,
    include: {
      user: true,
      votes: {
        where: {
          userId,
        },
        select: {
          voteType: true, // Only fetch the voteType to determine if it's an upvote or downvote
        },
      },
    },
  };

  return query;
};

export const generateHandle = (title: string): string => {
  const latinToEnglishMap: { [key: string]: string } = {
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    ñ: 'n',
    ç: 'c',
    ß: 'ss',
    ÿ: 'y',
    œ: 'oe',
    æ: 'ae',
  };

  const normalizedTitle = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const handle = normalizedTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[^\x00-\x7F]/g, (char) => latinToEnglishMap[char] || '');

  return handle;
};

export const getDisabledFeature = (feature: string): boolean => {
  return (process.env.NEXT_PUBLIC_DISABLE_FEATURES || '')
    .toLowerCase()
    .split(',')
    .includes(feature);
};

export type CourseContentType = 'folder' | 'video' | 'notion'