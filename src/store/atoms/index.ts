import { atom } from 'recoil';
export * from './courses';

//atom to keep track of current content
export const currentContentAtom = atom({
  key: 'currentContentAtom',
  default: null,
});
