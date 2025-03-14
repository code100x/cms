import { atom } from 'recoil';

export enum FilterType {
  WATCHED = 'watched',
  WATCHING = 'watching',
  UNWATCHED = 'unwatched',
  ALL = 'all',
}

export type FilterMessageIndex = FilterType | '';

export const selectFilter = atom<FilterMessageIndex>({
  key: 'selectFilter',
  default: '',
});

export const filterMessages: Record<FilterType, string> = {
  [FilterType.WATCHED]:
    "You haven't completed any content in this section yet.",
  [FilterType.WATCHING]: 'No content currently in progress.',
  [FilterType.UNWATCHED]: 'No new content available to watch.',
  [FilterType.ALL]: 'No content available in this section.',
};
