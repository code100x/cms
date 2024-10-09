'use client';

import { TSearchedVideos } from '@/app/api/search/route';
import useClickOutside from '@/hooks/useClickOutside';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { CommandMenu } from './CommandMenu';
import { SearchResults } from './SearchResults';
import VideoSearchInfo from './VideoSearchInfo';
import VideoSearchLoading from './VideoSearchLoading';
import VideoSearchCard from './VideoSearchCard';

interface SearchBarProps {
  onCardClick?: (videoUrl: string, videoId: number, videoTitle:string) => void;
  isMobile?: boolean;
  shouldRedirect?: boolean;
  disableCmdK?: boolean;
  placeholder?: string;
}

export function SearchBar({
  onCardClick,
  isMobile = false,
  shouldRedirect = true,
  disableCmdK = false,
  placeholder = 'Search for videos...',
}: SearchBarProps) {
  const [state, setState] = useState({
    open: false,
    searchTerm: '',
    commandSearchTerm: '',
    searchedVideos: null as TSearchedVideos[] | null,
    isInputFocused: false,
    loading: false,
    selectedIndex: -1,
  });

  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);
  const debouncedCommandSearchTerm = useDebounce(state.commandSearchTerm, 300);

  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickOutside(ref, () => {
    setState((prev) => ({ ...prev, isInputFocused: false }));
  });

  const fetchData = useCallback(async (term: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setState((prev) => ({ ...prev, searchedVideos: data, loading: false }));
    } catch (err) {
      toast.error('Something went wrong while searching for videos');
      setState((prev) => ({
        ...prev,
        commandSearchTerm: '',
        searchTerm: '',
        searchedVideos: null,
        loading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.trim().length > 2) {
      fetchData(debouncedSearchTerm);
    } else {
      setState((prev) => ({ ...prev, searchedVideos: null }));
    }
  }, [debouncedSearchTerm, fetchData]);

  useEffect(() => {
    if (debouncedCommandSearchTerm.trim().length > 2) {
      fetchData(debouncedCommandSearchTerm);
    } else {
      setState((prev) => ({ ...prev, searchedVideos: null }));
    }
  }, [debouncedCommandSearchTerm, fetchData]);

  const handleCardClick = useCallback(
    (videoUrl: string, videoId: number, videoTitle: string) => {
      if (onCardClick) {
        onCardClick(videoUrl, videoId, videoTitle);
      }
      setState((prev) => ({ ...prev, searchTerm: '', commandSearchTerm: '' }));
      if (shouldRedirect) {
        router.push(videoUrl);
      }
    },
    [onCardClick, router],
  );

  const renderSearchResults = () => {
    if (state.searchTerm.length < 3) {
      return (
        <VideoSearchInfo text="Please enter at least 3 characters to search" />
      );
    } else if (state.loading) {
      return <VideoSearchLoading />;
    } else if (!state.searchedVideos || state.searchedVideos.length === 0) {
      return <VideoSearchInfo text="No videos found" />;
    }
    return state.searchedVideos.map((video, index) => (
      <div
        className={` ${index === state.selectedIndex && 'bg-blue-600/10 text-blue-600'}`}
      >
        <VideoSearchCard
          key={video.id}
          video={video}
          onCardClick={handleCardClick}
        />
      </div>
    ));
  };

  if (disableCmdK) {
    const ref = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    useClickOutside(ref, () => {
      setIsInputFocused(false);
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, searchTerm: event.target.value }));
    };

    const handleClearInput = () => {
      setState((prev) => ({ ...prev, searchTerm: '' }));
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };

    return (
      <div
        className="relative flex h-10 w-full items-center lg:w-[32vw]"
        ref={ref}
      >
        {/* Search Input Bar */}
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-primary/80" />
        <Input
          placeholder={placeholder}
          className="focus:ring-none rounded-lg border-none bg-primary/5 px-10 text-base focus:outline-none"
          value={state.searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsInputFocused(true)}
          ref={searchInputRef}
        />
        {state.searchTerm.length > 0 && (
          <X
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer"
            onClick={handleClearInput}
          />
        )}

        {/* Search Results */}
        {isInputFocused && state.searchTerm.length > 0 && (
          <div className="absolute top-12 z-30 max-h-[40vh] w-full overflow-y-auto rounded-lg border-2 bg-background p-2 shadow-lg">
            {renderSearchResults()}
          </div>
        )}
      </div>
    );
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setState((prev) => ({ ...prev, open: !prev.open }));
      }

      if (state.open) {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setState((prev) => ({
              ...prev,
              selectedIndex:
                (prev.selectedIndex + 1) % (prev.searchedVideos?.length || 0),
            }));
            break;
          case 'ArrowUp':
            e.preventDefault();
            setState((prev) => ({
              ...prev,
              selectedIndex:
                (prev.selectedIndex - 1 + (prev.searchedVideos?.length || 0)) %
                (prev.searchedVideos?.length || 0),
            }));
            break;
          case 'Enter':
            e.preventDefault();
            if (state.selectedIndex !== -1 && state.searchedVideos) {
              const selectedVideo = state.searchedVideos[state.selectedIndex];
              if (
                selectedVideo.parentId &&
                selectedVideo.parent?.courses.length
              ) {
                const courseId = selectedVideo.parent.courses[0].courseId;
                const videoUrl = `/courses/${courseId}/${selectedVideo.parentId}/${selectedVideo.id}`;
                router.push(videoUrl);
                setState((prev) => ({ ...prev, open: false }));
              }
            }
            break;
        }
      }
    },
    [state.open, state.selectedIndex, state.searchedVideos, router],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, searchTerm: event.target.value }));
    },
    [],
  );

  const icon = useMemo(() => {
    return navigator.userAgent.toLowerCase().includes('mac') ? '⌘' : 'Ctrl + ';
  }, []);

  return (
    <>
      <div
        className={`relative mx-auto flex w-full items-center ${
          isMobile ? 'max-w-full' : 'max-w-sm lg:max-w-lg'
        }`}
        ref={ref}
      >
        {/* Search Input */}
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search Anything"
          className="rounded-lg border-gray-200 bg-white pl-10 pr-12 focus-visible:ring-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:focus-visible:ring-gray-700"
          value={state.searchTerm}
          onChange={handleInputChange}
          onFocus={() =>
            setState((prev) => ({ ...prev, isInputFocused: true }))
          }
          aria-label="Search"
        />
        {state.searchTerm.length === 0 &&
          !isMobile &&
          (icon !== '⌘' ? (
            <kbd className="pointer-events-none absolute right-3 top-2.5 inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:block">
              <span className="text-xs">{icon}</span>K
            </kbd>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-2.5 inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <span className="text-lg">{icon}</span>K
            </kbd>
          ))}

        <SearchResults
          isVisible={
            (state.isInputFocused || isMobile) && state.searchTerm.length > 0
          }
          isMobile={isMobile}
          searchTerm={state.searchTerm}
          loading={state.loading}
          searchedVideos={state.searchedVideos}
          selectedIndex={state.selectedIndex}
          onCardClick={handleCardClick}
        />
      </div>

      {!isMobile && (
        <CommandMenu
          icon={icon}
          open={state.open}
          onOpenChange={(open) => setState((prev) => ({ ...prev, open }))}
          commandSearchTerm={state.commandSearchTerm}
          onCommandSearchTermChange={(value) =>
            setState((prev) => ({ ...prev, commandSearchTerm: value }))
          }
          loading={state.loading}
          searchedVideos={state.searchedVideos}
          onCardClick={handleCardClick}
          onClose={() => setState((prev) => ({ ...prev, open: false }))}
        />
      )}
    </>
  );
}
