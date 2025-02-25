import { atom } from 'recoil';

export type FilterType = 'watched' | 'watching' | 'unwatched' | 'all';

export const selectFilter = atom<FilterType>({
  key: 'selectFilter',
  default: 'all',
});