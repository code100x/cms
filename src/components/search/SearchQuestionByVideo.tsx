'use client';

import React, { useState } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { FormPostInput } from '../posts/form/form-input';

interface SearchQuestionByVideoProps {
  onCardClick?: (
    videoUrl?: string,
    videoId?: number,
    videoTitle?: string,
  ) => void;
  shouldRedirect?: boolean;
  disableCmdK?: boolean;
  placeholder?: string;
}

const SearchQuestionByVideo: React.FC<SearchQuestionByVideoProps> = (props) => {
  const [videoId, setVideoId] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const router = useRouter();

  const handleSearch = (
    videoUrl?: string,
    videoId?: number,
    videoTitle?: string,
  ) => {
    router.push(`/question?videoId=${videoId}`);
    if (videoUrl && videoId && videoTitle) {
      setVideoId(videoId.toString());
      setVideoTitle(videoTitle);
    }
  };
  
  return (
    <div className='relative flex h-10 w-full items-center md:w-[300px] lg:w-[400px] xl:w-[500px] gap-2'>
      {videoId ? (
        <div className="flex w-full items-center gap-2">
          <FormPostInput
            id="videoTitle"
            placeholder="Select a video from the search"
            value={videoTitle}
            className="w-full"
            disabled={true}
          />
          <Button
            type="button"
            className="flex-shrink-0"
            onClick={() => {
              setVideoId('');
              setVideoTitle('');
              router.push('/question');
            }}
          >
            Clear
          </Button>
        </div>
      ) : (
        <SearchBar
          {...props}
          shouldRedirect={false}
          disableCmdK={true}
          onCardClick={handleSearch}
          placeholder="Search by video"
        />
      )}
    </div>

  );
};

export default SearchQuestionByVideo;