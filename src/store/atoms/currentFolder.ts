import { atom } from 'recoil';

export const currentFolderState = atom<number | null>({
  key: 'currentFolder',
  default: null,
});
