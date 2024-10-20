import { atom } from 'recoil';

export const trigger = atom<string>({
  key: 'trigger',
  default: 'start',
});

//why? because we need to trigger a re-render when we add a new course.
