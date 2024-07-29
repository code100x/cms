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

const SearchBar = ({ onCardClick }: { onCardClick?: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedVideos, setSearchedVideos] = useState<
    TSearchedVideos[] | null
  >(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsInputFocused(true);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }

      if (event.key === 'Escape') {
        setIsInputFocused(false);
        searchInputRef.current?.blur();
        setSearchTerm('');
      }
      if (
        isInputFocused &&
        (event.key === 'ArrowDown' || event.key === 'ArrowUp')
      ) {
        event.preventDefault();
      }

      if (
        isInputFocused &&
        event.key === 'ArrowDown' &&
        focusedIndex < (searchedVideos?.length ?? 0) - 1
      ) {
        setFocusedIndex(focusedIndex + 1);
      } else if (
        isInputFocused &&
        event.key === 'ArrowUp' &&
        focusedIndex > -1
      ) {
        setFocusedIndex(focusedIndex - 1);
      } else if (
        event.key === 'Enter' &&
        focusedIndex > -1 &&
        focusedIndex < (searchedVideos?.length ?? 0)
      ) {
        event.preventDefault();
        if (searchedVideos) {
          const currentVideo = searchedVideos[focusedIndex];
          const courseId =
            searchedVideos[focusedIndex].parent?.courses[0].courseId;
          const videoUrl = `/courses/${courseId}/${currentVideo?.parentId}/${currentVideo?.id}`;
          handleCardClick(videoUrl);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInputFocused, focusedIndex, searchedVideos]);

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
    return searchedVideos.map((video, index) => (
      <VideoSearchCard
        key={video.id}
        video={video}
        onCardClick={handleCardClick}
        isActive={index === focusedIndex}
      />
    ));
  };

  return (
    <div
      className="relative flex h-10 w-full items-center lg:w-[300px] xl:w-[400px]"
      ref={ref}
    >
      {/* Search Input Bar */}
      <SearchIcon className="absolute left-3 top-1/2 z-20 h-4 w-4 -translate-y-1/2 transform text-gray-300" />
      <Input
        placeholder="Search.."
        className="z-10 cursor-pointer rounded-lg border-2 px-10 placeholder:font-semibold placeholder:text-gray-600 hover:bg-gray-800 focus-visible:ring-transparent placeholder:dark:text-gray-200"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsInputFocused(true)}
        ref={searchInputRef}
      />
      <div className="z-1 absolute inset-0 flex items-center justify-end pr-3">
        {isInputFocused ? (
          <kbd className="z-20 flex h-6 w-10 items-center justify-center rounded-sm bg-gray-200 px-1.5 text-xs leading-3 dark:bg-gray-700 md:-translate-x-7">
            Esc
          </kbd>
        ) : (
          <kbd className="z-20 flex h-6 w-16 items-center justify-center rounded-sm bg-gray-200 px-1.5 text-xs leading-3 dark:bg-gray-700 md:-translate-x-7">
            Ctrl K
          </kbd>
        )}
      </div>
      {searchTerm.length > 0 && (
        <XCircleIcon
          className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform cursor-pointer"
          onClick={handleClearInput}
        />
      )}
      {/* Search Results */}
      {isInputFocused && searchTerm.length > 0 && (
        <div className="absolute top-12 max-h-[40vh] w-full overflow-y-auto rounded-lg border-2 bg-white py-2 shadow-lg dark:bg-[#020817]">
          {renderSearchResults()}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
