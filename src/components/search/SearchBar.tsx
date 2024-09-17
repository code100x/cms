'use client';

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
import VideoSearchCard from './VideoSearchCard';
import VideoSearchInfo from './VideoSearchInfo';
import VideoSearchLoading from './VideoSearchLoading';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { TSearchedVideos } from '@/app/api/search/route';

interface SearchBarProps {
  onCardClick?: () => void;
}

export default function SearchBar({ onCardClick }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [commandSearchTerm, setCommandSearchTerm] = useState('');
  const [searchedVideos, setSearchedVideos] = useState<
    TSearchedVideos[] | null
  >(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const commandDialogRef = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsInputFocused(false);
  });

  const fetchData = useCallback(async (term: string) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchedVideos(data);
    } catch (err) {
      toast.error('Something went wrong while searching for videos');
      setCommandSearchTerm('');
      setSearchTerm('');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debouncing (Main Input Field)
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (searchTerm.trim().length > 2) {
        fetchData(searchTerm);
      } else {
        setSearchedVideos(null);
      }
    }, 300);

    return () => clearTimeout(debouncedSearch);
  }, [searchTerm, fetchData]);

  // Debouncing (CommandDialog)
  useEffect(() => {
    const debouncedCommandSearch = setTimeout(() => {
      if (commandSearchTerm.trim().length > 2) {
        fetchData(commandSearchTerm);
      } else {
        setSearchedVideos(null);
      }
    }, 300);

    return () => clearTimeout(debouncedCommandSearch);
  }, [commandSearchTerm, fetchData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }

      if (open && e.key === 'Enter') {
        e.preventDefault();
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement) {
          activeElement.click();
        }
      }

      // Shortcut Handlers
      if (open && e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'c':
            e.preventDefault();
            router.push('/home');
            setOpen(false);
            break;
          case 'h':
            e.preventDefault();
            router.push('/watch-history');
            setOpen(false);
            break;
          case 'b':
            e.preventDefault();
            router.push('/bookmark');
            setOpen(false);
            break;
          case 'q':
            e.preventDefault();
            router.push('/question');
            setOpen(false);
            break;
          case 's':
            e.preventDefault();
            window.location.href = 'https://projects.100xdevs.com/';
            setOpen(false);
            break;
          case 'g':
            e.preventDefault();
            window.location.href = 'https://github.com/code100x/';
            setOpen(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, router]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (videoUrl: string) => {
    if (onCardClick !== undefined) {
      onCardClick();
    }
    setSearchTerm('');
    setCommandSearchTerm('');
    router.push(videoUrl);
  };

  const renderSearchResults = (term: string) => {
    if (term.length < 3) {
      return (
        <VideoSearchInfo text="Please enter at least 3 characters to search" />
      );
    }
    if (loading) {
      return <VideoSearchLoading />;
    }
    if (!searchedVideos || searchedVideos.length === 0) {
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

  const icon = navigator.userAgent.toLowerCase().includes('mac')
    ? '⌘'
    : 'Ctrl + ';

  return (
    <>
      <div
        className="relative mx-auto flex w-full max-w-sm items-center lg:max-w-lg"
        ref={ref}
      >
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search Anything"
          className="rounded-lg border-gray-200 bg-white pl-10 pr-12 focus-visible:ring-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:focus-visible:ring-gray-700"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsInputFocused(true)}
          ref={searchInputRef}
        />

        {searchTerm.length === 0 && (
          <kbd className="pointer-events-none absolute right-3 top-2.5 inline-flex hidden h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:block">
            <span className="text-xs">{icon}</span>K
          </kbd>
        )}

        {isInputFocused && searchTerm.length > 0 && (
          <div className="absolute top-12 z-30 max-h-[40vh] w-full overflow-y-auto rounded-lg border-2 bg-background p-2 shadow-lg">
            {renderSearchResults(searchTerm)}
          </div>
        )}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div ref={commandDialogRef}>
          <CommandInput
            placeholder="Type a command or search..."
            value={commandSearchTerm}
            onValueChange={setCommandSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Videos">
              {loading ? (
                <CommandItem>
                  <VideoSearchLoading />
                </CommandItem>
              ) : (
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                  }}
                >
                  {renderSearchResults(commandSearchTerm)}
                </CommandItem>
              )}
            </CommandGroup>

            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={() => {
                  router.push('/calendar');
                  setOpen(false);
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
                  setOpen(false);
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
        </div>
      </CommandDialog>
    </>
  );
}
