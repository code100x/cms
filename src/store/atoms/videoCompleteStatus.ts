import { atom } from 'recoil';

interface VideoCompleteStatus {
  id: number | null;
  isComplete: boolean;
}

export const videoCompleteState = atom<VideoCompleteStatus>({
  key: 'videoCompleteState',
  default: {
    id: null,
    isComplete: false, // Default the video is not marked as complete
  },
});
