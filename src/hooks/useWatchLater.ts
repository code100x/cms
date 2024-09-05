import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  watchLaterVideoData,
  Content,
  selectedVideoIdsState,
} from '@/store/atoms/watchlater'; // Import the updated atom

export const useFetchWatchLater = () => {
  const [videoData, setVideoData] =
    useRecoilState<Content[]>(watchLaterVideoData);
  const [selectedVideoIds] = useRecoilState(selectedVideoIdsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWatchLaterVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/watch-later', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Watch Later videos');
      }

      const data = await response.json();

      const formattedData = data.map((video: any) => ({
        content: video.content, // This avoids content.content nesting
      }));

      setVideoData(formattedData);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching Watch Later videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchLaterVideos();
  }, [selectedVideoIds]);

  return { videoData, loading, error };
};
