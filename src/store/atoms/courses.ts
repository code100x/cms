import { TabType } from '@/actions/types';
import { CommentType } from '@prisma/client';
import axios from 'axios';
import { atom, selector } from 'recoil';

export type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  appxCourseId: number;
  discordRoleId: string;
  openToEveryone: boolean;
  totalVideos?: number;
  totalVideosWatched?: number;
  certIssued: boolean;
};

const coursesSelector = selector({
  key: 'coursesSelector',
  get: async () => {
    const response = await axios.get('/api/courses');
    return response.data.courses as Course[];
  },
});

export const coursesAtom = atom<Course[]>({
  key: 'coursesAtom',
  default: coursesSelector,
});

export const lastTabTypeAtom = atom<TabType | null>({
  key: 'lastTabTypeAtom',
  default: null,
});

export const lastCommentTypeAtom = atom<CommentType | null>({
  key: 'lastCommentType',
  default: null,
});
