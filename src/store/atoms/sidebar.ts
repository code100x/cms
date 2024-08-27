import { atom } from 'recoil';

export const sidebarContent = atom({
  key: 'sidebarOpen',
  default: true,
});

export const sidebarMain = atom({
  key: 'sidebarMainOpen',
  default: true,
});
