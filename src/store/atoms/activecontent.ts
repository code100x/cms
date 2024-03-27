import { atom } from 'recoil';

export const activeContentIds = atom<number[]>({
  key: 'activeContentIds',
  default: [],
});

export const currentContentId = atom<number>({
  key: 'currentContentId',
  default: 0,
});
