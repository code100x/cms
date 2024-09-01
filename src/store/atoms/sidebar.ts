import { atom } from 'recoil';

export const sidebarOpen = atom({
  key: 'sidebarOpen',
  default: true,
});

export const sectionSidebarOpen = atom({
  key: 'sectionSidebarOpen',
  default: true,
});
