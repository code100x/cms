import { atom } from 'recoil';
import { VideoCompletionData } from '@/lib/utils';

export const videoCompletionAtom = atom<VideoCompletionData[]>({
  key: 'videoCompletionAtom',
  default: []
});