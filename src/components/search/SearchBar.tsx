import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon, XCircleIcon } from 'lucide-react';
import { TSearchedVideos } from '@/app/api/search/route';
import { useRouter } from 'next/navigation';
import useClickOutside from '@/hooks/useClickOutside';
import VideoSearchCard from './VideoSearchCard';
import VideoSearchInfo from './VideoSearchInfo';
import { toast } from 'sonner';
import VideoSearchLoading from './VideoSearchLoading';
import { useRecoilState } from 'recoil';
import {
  Content,
  selectedVideoIdsState,
  watchLaterVideoData,
} from '@/store/atoms/watchlater';
import { addWatchLater } from '@/utiles/add-watch-later';
import { deleteWatchLater } from '@/utiles/delete-watch-later';

const SearchBar = ({
  onCardClick,
  watchLater = false,
}: {
  onCardClick?: () => void;
  watchLater?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedVideos, setSearchedVideos] = useState<
    TSearchedVideos[] | null
  >(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] =
    useRecoilState<Content[]>(watchLaterVideoData);

  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedVideoIds, setSelectedVideoIds] = useRecoilState(
    selectedVideoIdsState,
  );

  useClickOutside(ref, () => {
    setIsInputFocused(false);
  });

  const fetchData = useCallback(async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchedVideos(data);
    } catch (err) {
      toast.error('Something went wrong while searching for videos');
      setSearchTerm('');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trimEnd().length > 2) {
      const timeoutId = setTimeout(() => {
        fetchData(searchTerm);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
    setSearchedVideos(null);
  }, [searchTerm, fetchData]);

  useEffect(() => {
    const selectIds = videoData.map((val) => val.content.id);
    setSelectedVideoIds(selectIds);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  const handleCardClick = (videoUrl: string) => {
    if (onCardClick !== undefined) {
      onCardClick();
    }
    clearSearchTerm();
    router.push(videoUrl);
  };

  const handleClearInput = () => {
    clearSearchTerm();
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCheckboxClick = async (video: any, isChecked: boolean) => {
    const { id } = video;

    if (isChecked) {
      await addWatchLater(id, setVideoData);
      setSelectedVideoIds((prev) => [...prev, id]);
    } else {
      await deleteWatchLater(id, setSelectedVideoIds, setVideoData);
    }
  };

  const renderSearchResults = () => {
    if (searchTerm.length < 3) {
      return (
        <VideoSearchInfo text="Please enter at least 3 characters to search" />
      );
    } else if (loading) {
      return <VideoSearchLoading />;
    } else if (!searchedVideos || searchedVideos.length === 0) {
      return <VideoSearchInfo text="No videos found" />;
    }
    return searchedVideos.map((video, index) => {
      const isChecked = selectedVideoIds.includes(video.id);

      return (
        <div
          className="flex"
          key={index}
          onClick={() => watchLater && handleCheckboxClick(video, !isChecked)}
        >
          {watchLater && (
            <input
              checked={isChecked}
              onChange={(e) => handleCheckboxClick(video, e.target.checked)}
              type="checkbox"
              className="ml-3 mt-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
          )}
          <VideoSearchCard
            video={video}
            onCardClick={!watchLater ? handleCardClick : () => {}}
            watchLater={watchLater}
          />
        </div>
      );
    });
  };

  return (
    <div
      className={`relative flex h-10 w-full items-center lg:w-[300px] ${watchLater ? 'xl:w-[360px]' : 'xl:w-[400px]'}`}
      ref={ref}
    >
      {/* Search Input Bar */}
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        placeholder={
          watchLater ? 'Search and Add Videos...' : 'Search for videos...'
        }
        className="rounded-lg border-gray-300 bg-gray-50 px-10 text-base focus:outline-none dark:border-gray-700/50 dark:bg-transparent dark:text-white dark:placeholder-gray-400"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsInputFocused(true)}
        ref={searchInputRef}
      />
      {searchTerm.length > 0 && (
        <XCircleIcon
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer"
          onClick={handleClearInput}
        />
      )}

      {/* Search Results */}
      {isInputFocused && searchTerm.length > 0 && (
        <div className="absolute top-14 z-30 max-h-[40vh] w-full overflow-y-auto rounded-lg border-2 bg-white py-2 shadow-lg dark:bg-[#020817]">
          {renderSearchResults()}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
