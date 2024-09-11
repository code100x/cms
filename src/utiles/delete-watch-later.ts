import {
  Content,
} from '@/store/atoms/watchlater';
import { SetterOrUpdater } from 'recoil';
import { toast } from 'sonner';

export const deleteWatchLater = async (
  contentId: number,
  setSelectedVideoIds: SetterOrUpdater<number[]>,
  setVideoData: SetterOrUpdater<Content[]>,
) => {
  try {
    const response = await fetch('/api/watch-later', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to remove content from Watch Later');
    }

    const result = await response.json();
    console.log(result.message);

    setSelectedVideoIds((prev) => prev.filter((val) => val !== contentId));
    setVideoData((prev) =>
      prev.filter((item) => item.content.id !== contentId),
    );

    toast.success('Video removed from Watch Later');
  } catch (error) {
    console.error('Error deleting Watch Later video:', error);
    toast.error(
      'Something went wrong while removing the video from Watch Later',
    );
  }
};
