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
import { SiGithub, SiNotion } from '@icons-pack/react-simple-icons';
import {
  Bookmark,
  Calendar,
  History,
  LogOut,
  MessageCircleQuestion,
  NotebookPen,
  NotebookText,
  Play,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import VideoSearchCard from './VideoSearchCard';

interface CommandMenuProps {
  icon: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commandSearchTerm: string;
  onCommandSearchTermChange: (value: string) => void;
  loading: boolean;
  selectedIndex: number;
  searchedVideos: TSearchedVideos[] | null;
  onCardClick: (videoUrl: string) => void;
  onClose: () => void;
}

export function CommandMenu({
  icon,
  open,
  onOpenChange,
  commandSearchTerm,
  onCommandSearchTermChange,
  loading,
  selectedIndex,
  searchedVideos,
  onCardClick,
  onClose,
}: CommandMenuProps) {
  const router = useRouter();

  const handleShortcut = useCallback(
    (route: string) => {
      if (route.startsWith('http')) {
        window.location.href = route;
      } else {
        router.push(route);
      }
      onClose();
    },
    [router, onClose],
  );

  // Shortcut Handlers
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (open && e.ctrlKey) {
        const shortcuts = {
          c: '/home',
          h: '/watch-history',
          b: '/bookmark',
          d: '/question',
          s: 'https://projects.100xdevs.com/',
          g: 'https://github.com/code100x/',
        };

        const key = e.key.toLowerCase() as keyof typeof shortcuts;
        if (shortcuts[key]) {
          e.preventDefault();
          handleShortcut(shortcuts[key]);
        }
      }
    },
    [open, handleShortcut],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        value={commandSearchTerm}
        onValueChange={onCommandSearchTermChange}
      />
      <CommandList>
        <div className='overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground'>
          <div cmdk-group-heading="" aria-hidden="true" id=":r15:">videos</div>
          {!loading &&
            searchedVideos &&
            searchedVideos.length > 0 &&
            searchedVideos.map((video, index) => (
              <div
                key={video.id}
                className={`${index === selectedIndex ? 'bg-blue-600/10 text-blue-600' : ''}`}
              >
                <VideoSearchCard video={video} onCardClick={onCardClick} />
              </div>
            ))}
          {!loading && (!searchedVideos || searchedVideos.length === 0) && (
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50">No videos found</div>
          )}
        </div>
        <CommandSeparator />

        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => handleShortcut('/calendar')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              handleShortcut('https://github.com/100xdevs-cohort-3/assignments')
            }
          >
            <NotebookPen className="mr-2 h-4 w-4" />
            <span>Cohort 3 Assignments</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              signOut();
              onClose();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Hotkeys">
          <CommandItem onSelect={() => handleShortcut('/home')}>
            <NotebookText className="mr-2 h-4 w-4" />
            <span>Courses</span>
            <CommandShortcut>{icon}C</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleShortcut('/watch-history')}>
            <History className="mr-2 h-4 w-4" />
            <span>Watch History</span>
            <CommandShortcut>{icon}H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleShortcut('/bookmark')}>
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
            <CommandShortcut>{icon}B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleShortcut('/question')}>
            <MessageCircleQuestion className="mr-2 h-4 w-4" />
            <span>Questions</span>
            <CommandShortcut>{icon}D</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => handleShortcut('https://projects.100xdevs.com/')}
          >
            <SiNotion className="mr-2 h-4 w-4" />
            <span>Slides</span>
            <CommandShortcut>{icon}S</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => handleShortcut('https://github.com/code100x/')}
          >
            <SiGithub className="mr-2 h-4 w-4" />
            <span>Contribute to code100x</span>
            <CommandShortcut>{icon}G</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}