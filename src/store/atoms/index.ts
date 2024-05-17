export * from './courses';
import { OutputData } from '@editorjs/editorjs';
import { atom } from 'recoil';
export const contentAtom = atom<OutputData | undefined>({
  key: 'content',
  default: undefined,
});
