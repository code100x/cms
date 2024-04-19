import { atom } from 'recoil';

export const sidebarOpen = atom({
  key: 'sidebarOpen',
  default: true,
});
export const chaptersOpen = atom({
  key: 'chaptersOpen',
  default: false,
});

export const theaterModeChapters = atom({
  key: 'metadataState',
  default: false,
});
