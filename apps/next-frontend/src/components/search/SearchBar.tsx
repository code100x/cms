import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@repo/ui/shad/input';
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
    return searchedVideos.map((video) => (
      <VideoSearchCard
        key={video.id}
        video={video}
        onCardClick={handleCardClick}
      />
    ));
  };

  return (
    <div
      className="relative flex items-center w-full lg:w-[300px] xl:w-[400px] h-10"
      ref={ref}
    >
      {/* Search Input Bar */}
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        placeholder="Search for videos..."
        className="px-10 border-2 focus-visible:ring-transparent rounded-full"
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
        <div className="absolute top-12 bg-white dark:bg-[#020817] rounded-lg border-2 shadow-lg w-full py-2 max-h-[40vh] overflow-y-auto">
          {renderSearchResults()}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
