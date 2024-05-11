export * from './courses';
import { atom } from 'recoil';

export const contentAtom = atom({
  key: 'content',
  default: '',
});
export const answersAtom = atom({
  key: 'answers',
  default: [],
});
