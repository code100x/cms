import { atom } from 'recoil';

export const sidebarOpen = atom({
  key: 'sidebarOpen',
  default: true,
});

export const contentSidebarOpen = atom({
  key: 'contentSidebarOpen',
  default: true,
});
