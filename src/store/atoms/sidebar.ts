import { atom } from 'recoil';

export const sidebarOpen = atom({
  key: 'sidebarOpen',
  default: false,
});
export const sidebarState = atom<boolean>({
  key: 'sidebarState',
  default: true,
});
