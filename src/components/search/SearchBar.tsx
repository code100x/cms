'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { TSearchedVideos } from '@/app/api/search/route';
import { useRouter } from 'next/navigation';
import VideoSearchCard from './VideoSearchCard';
import VideoSearchInfo from './VideoSearchInfo';
import { toast } from 'sonner';
import VideoSearchLoading from './VideoSearchLoading';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from '../ui/command';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedVideos, setSearchedVideos] = useState<TSearchedVideos[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

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
    setSearchedVideos([]);
  }, [searchTerm, fetchData]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyK':
          if (event.ctrlKey) {
            event.preventDefault();
            setDialogOpen((prev) => !prev);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(
            (prevIndex) => (prevIndex + 1) % searchedVideos.length,
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(
            (prevIndex) =>
              (prevIndex - 1 + searchedVideos.length) % searchedVideos.length,
          );
          break;
        case 'Enter':
          if (selectedIndex !== -1) {
            event.preventDefault();
            const {
              id: videoId,
              parentId,
              parent,
            } = searchedVideos[selectedIndex];

            if (parentId && parent?.courses.length) {
              const courseId = parent.courses[0].courseId;
              const videoUrl = `/courses/${courseId}/${parentId}/${videoId}`;
              router.push(videoUrl);
            }
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [searchedVideos, selectedIndex]);

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
      <div
        className={` ${index === selectedIndex && 'bg-blue-600/10 text-blue-600'}`}
      >
        <VideoSearchCard key={video.id} video={video} />
      </div>
    ));
  };

  return (
    <>
      <Command onClick={() => setDialogOpen(true)}>
        <div className="flex items-center justify-between border-2">
          <CommandInput
            placeholder="Search video..."
            value={searchTerm}
            onValueChange={(search) => setSearchTerm(search)}
          />
          <kbd className="m-1 rounded-sm bg-white/15 p-1.5 text-xs leading-3">
            Ctrl K
          </kbd>
        </div>
        <CommandList></CommandList>
      </Command>
      <CommandDialog
        open={dialogOpen}
        onOpenChange={() => setDialogOpen((prev) => !prev)}
      >
        <CommandInput
          placeholder="Search video..."
          value={searchTerm}
          onValueChange={(search) => setSearchTerm(search)}
        />
        <CommandList>{renderSearchResults()}</CommandList>
      </CommandDialog>
    </>
  );
}
