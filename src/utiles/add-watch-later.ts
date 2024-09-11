// addToWatchLater.ts (utility function)
import { Content } from '@/store/atoms/watchlater';
import { SetterOrUpdater } from 'recoil';
import { toast } from 'sonner';

export const addWatchLater = async (
  contentId: number,
  setVideoData: SetterOrUpdater<Content[]>,
) => {
  try {
    const response = await fetch('/api/watch-later', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add content to Watch Later');
    }

    const result = await response.json();
    console.log(result.message);

    setVideoData((prev) => [
      ...prev,
      { content: { id: contentId } } as Content,
    ]);

    toast.success('Video added to Watch Later');
  } catch (error) {
    console.error('Error adding Watch Later video:', error);
    toast.error('Something went wrong while adding the video to Watch Later');
  }
};
