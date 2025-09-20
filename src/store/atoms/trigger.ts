import { atom } from 'recoil';

export const trigger = atom<number>({
  key: 'trigger',
  default: 0,
});
