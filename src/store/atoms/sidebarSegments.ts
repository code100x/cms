import { Segment } from '@/lib/utils';
import { atom } from 'recoil';

export const sidebarSegments = atom<Segment[]>({
  key: 'sidebarSegments',
  default: [],
});
