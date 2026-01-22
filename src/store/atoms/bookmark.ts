import { atom } from 'recoil';
import { Bookmark } from '@prisma/client';

export const bookmarksState = atom<Bookmark[] >({
  key: 'bookmarksState',
  default: [],
});
