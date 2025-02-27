import { atom } from 'recoil';

export const trigger = atom<number>({
  key: 'trigger',
  default: 0,
});

export const pipTrigger = atom<boolean>({
  key: 'pip_trigger',
  default: false
});