import { atom } from 'recoil';

export const trigger = atom<boolean>({
  key: 'trigger',
  default: false,
});

//why? because we need to trigger a re-render when we add a new course and couldn't make a context api for it.
