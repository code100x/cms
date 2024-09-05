import { CourseContent } from '@prisma/client';
import { atom } from 'recoil';

export type TWatchLater = {
  id: number;
  parentId: number | null;
  title: string;
  createdAt?: string;
} & {
  parent: { courses: CourseContent[] } | null;
};

export type Content = {
  content: TWatchLater;
};

export const watchLaterVideoData = atom({
  key: 'watchLaterVideoData',
  default: [] as Content[],
});

export const courseData = atom({
  key: 'courseData',
  default: [] as any,
});

export const selectedVideoIdsState = atom<number[]>({
  key: 'selectedVideoIdsState',
  default: [],
});
