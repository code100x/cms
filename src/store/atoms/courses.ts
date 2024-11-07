import { FullCourseContent } from '@/db/course';
import axios from 'axios';
import { atom, selector } from 'recoil';

export type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  appxCourseId: string;
  discordRoleId: string;
  openToEveryone: boolean;
  totalVideos?: number;
  totalVideosWatched?: number;
  certIssued: boolean;
  discordOauthUrl: string;
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

export const courseIdAtom = atom<string | null>({
  key: 'courseIdAtom',
  default: null,
});

// Added default null value instead of placeholder because it will cause API call to fail when check mark is clicked from UI
export const fullCourseContentAtom = atom<FullCourseContent[]|null>({
  key: 'fullCourseContentAtom',
  default: null
});