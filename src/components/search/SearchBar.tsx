'use client';

import { TSearchedVideos } from '@/app/api/search/route';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import useClickOutside from '@/hooks/useClickOutside';
import { SiGithub, SiNotion } from '@icons-pack/react-simple-icons';
import {
  Bookmark,
  Calendar,
  Clapperboard,
  History,
  LogOut,
  MessageCircleCode,
  NotebookText,
  SearchIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import VideoSearchCard from './VideoSearchCard';
import VideoSearchInfo from './VideoSearchInfo';
import VideoSearchLoading from './VideoSearchLoading';

interface SearchBarProps {
  onCardClick?: () => void;
  isMobile: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBar({ onCardClick, isMobile }: SearchBarProps) {
  // Combined state object for better performance
  const [state, setState] = useState({
    open: false,
    searchTerm: '',
    commandSearchTerm: '',
    searchedVideos: null as TSearchedVideos[] | null,
    isInputFocused: false,
    loading: false,
  });

  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);
  const debouncedCommandSearchTerm = useDebounce(state.commandSearchTerm, 300);

  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useClickOutside(ref, () => {
    setState((prev) => ({ ...prev, isInputFocused: false }));
  });

  // Memoized fetch function to prevent unnecessary re-creations
  const fetchData = useCallback(async (term: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setState((prev) => ({ ...prev, searchedVideos: data }));
    } catch (err) {
      toast.error('Something went wrong while searching for videos');
      setState((prev) => ({ ...prev, commandSearchTerm: '', searchTerm: '' }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Effect for main search input
  useEffect(() => {
    if (debouncedSearchTerm.trim().length > 2) {
      fetchData(debouncedSearchTerm);
    } else {
      setState((prev) => ({ ...prev, searchedVideos: null }));
    }
  }, [debouncedSearchTerm, fetchData]);

  // Effect for command dialog search
  useEffect(() => {
    if (debouncedCommandSearchTerm.trim().length > 2) {
      fetchData(debouncedCommandSearchTerm);
    } else {
      setState((prev) => ({ ...prev, searchedVideos: null }));
    }
  }, [debouncedCommandSearchTerm, fetchData]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setState((prev) => ({ ...prev, open: !prev.open }));
      }

      if (state.open && e.key === 'Enter') {
        e.preventDefault();
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement) {
          activeElement.click();
        }
      }

      // Shortcut Handlers
      if (state.open && e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'c':
            e.preventDefault();
            router.push('/home');
            setState((prev) => ({ ...prev, open: false }));
            break;
          case 'h':
            e.preventDefault();
            router.push('/watch-history');
            setState((prev) => ({ ...prev, open: false }));
            break;
          case 'b':
            e.preventDefault();
            router.push('/bookmark');
            setState((prev) => ({ ...prev, open: false }));
            break;
          case 'q':
            e.preventDefault();
            router.push('/question');
            setState((prev) => ({ ...prev, open: false }));
            break;
          case 's':
            e.preventDefault();
            window.location.href = 'https://projects.100xdevs.com/';
            setState((prev) => ({ ...prev, open: false }));
            break;
          case 'g':
            e.preventDefault();
            window.location.href = 'https://github.com/code100x/';
            setState((prev) => ({ ...prev, open: false }));
            break;
        }
      }
    },
    [state.open, router],
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

  const handleCardClick = useCallback(
    (videoUrl: string) => {
      if (onCardClick) {
        onCardClick();
      }
      setState((prev) => ({ ...prev, searchTerm: '', commandSearchTerm: '' }));
      router.push(videoUrl);
    },
    [onCardClick, router],
  );

  const renderSearchResults = useMemo(
    () => (term: string) => {
      if (term.length < 3) {
        return (
          <VideoSearchInfo text="Please enter at least 3 characters to search" />
        );
      }
      if (state.loading) {
        return <VideoSearchLoading />;
      }
      if (!state.searchedVideos || state.searchedVideos.length === 0) {
        return <VideoSearchInfo text="No videos found" />;
      }

      return state.searchedVideos.map((video) => (
        <VideoSearchCard
          key={video.id}
          video={video}
          onCardClick={handleCardClick}
        />
      ));
    },
    [state.loading, state.searchedVideos, handleCardClick],
  );

  const icon = useMemo(
    () => (navigator.userAgent.toLowerCase().includes('mac') ? '⌘' : 'Ctrl + '),
    [],
  );

  return (
    <>
      {/* Main search input */}
      <div
        className={`relative mx-auto flex w-full items-center ${
          isMobile ? 'max-w-full' : 'max-w-sm lg:max-w-lg'
        }`}
        ref={ref}
      >
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
          ref={searchInputRef}
          aria-label="Search"
        />

        {state.searchTerm.length === 0 && !isMobile && (
          <kbd className="pointer-events-none absolute right-3 top-2.5 inline-flex hidden h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:block">
            <span className="text-xs">{icon}</span>K
          </kbd>
        )}

        {(state.isInputFocused || isMobile) && state.searchTerm.length > 0 && (
          <div
            className={`absolute ${isMobile ? 'top-full' : 'top-12'} z-30 max-h-[40vh] w-full overflow-y-auto rounded-lg border-2 bg-background p-2 shadow-lg`}
          >
            {renderSearchResults(state.searchTerm)}
          </div>
        )}
      </div>

      {/* Command dialog for advanced navigation & shortcuts */}
      {!isMobile && (
        <CommandDialog
          open={state.open}
          onOpenChange={(open) => setState((prev) => ({ ...prev, open }))}
        >
          <CommandInput
            placeholder="Type a command or search..."
            value={state.commandSearchTerm}
            onValueChange={(value) =>
              setState((prev) => ({ ...prev, commandSearchTerm: value }))
            }
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Videos">
              {state.loading ? (
                <CommandItem>
                  <VideoSearchLoading />
                </CommandItem>
              ) : (
                <CommandItem
                  onSelect={() => {
                    setState((prev) => ({ ...prev, open: false }));
                  }}
                >
                  {renderSearchResults(state.commandSearchTerm)}
                </CommandItem>
              )}
            </CommandGroup>

            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={() => {
                  router.push('/calendar');
                  setState((prev) => ({ ...prev, open: false }));
                }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Clapperboard className="mr-2 h-4 w-4" />
                <span>Search Videos</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  signOut();
                  setState((prev) => ({ ...prev, open: false }));
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Hotkeys">
              <CommandItem>
                <NotebookText className="mr-2 h-4 w-4" />
                <span>Courses</span>
                <CommandShortcut>{icon}C</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <History className="mr-2 h-4 w-4" />
                <span>Watch History</span>
                <CommandShortcut>{icon}H</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Bookmarks</span>
                <CommandShortcut>{icon}B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <MessageCircleCode className="mr-2 h-4 w-4" />
                <span>Questions</span>
                <CommandShortcut>{icon}Q</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiNotion className="mr-2 h-4 w-4" />
                <span>Slides</span>
                <CommandShortcut>{icon}S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SiGithub className="mr-2 h-4 w-4" />
                <span>Contribute to code100x</span>
                <CommandShortcut>{icon}G</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )}
    </>
  );
}
