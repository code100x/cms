'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { TSearchedVideos } from '@/app/api/search/route';
import { useRouter } from 'next/navigation';
import VideoSearchCard from './VideoSearchCard';
import VideoSearchInfo from './VideoSearchInfo';
import { toast } from 'sonner';
import VideoSearchLoading from './VideoSearchLoading';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';

const ContentSearch = () => {
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
            setDialogOpen(true);
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

            if (parentId && parent) {
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
  const handleClose = (open: boolean) => {
    if (!open) {
      setDialogOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={handleClose}>
        <Button
          variant="outline"
          className="pr-2"
          onClick={() => setDialogOpen(true)}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex text-primary/80 lg:w-[32vw]">
              <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
              <span className="px-2">Search for videos</span>
            </div>
            <kbd className="rounded-sm bg-white/15 p-1.5 text-xs leading-3">
              Ctrl K
            </kbd>
          </div>
          <div className="block md:hidden">
            <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </Button>
        <DialogContent className="max-w-2xl gap-0 p-0">
          {/* Search Input Bar */}
          <div className="flex items-center border-b px-4 py-2">
            <SearchIcon className="h-[1.5rem] w-[1.5rem]" />
            <Input
              type="text"
              placeholder="Type title"
              className="border-none text-base shadow-none focus-visible:outline-none focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Search Results */}
          <div>
            {searchTerm.length > 0 && (
              <div className="absolute top-12 z-30 max-h-[40vh] w-full overflow-y-auto rounded-lg border-2 bg-background p-2 shadow-lg">
                {renderSearchResults()}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentSearch;
