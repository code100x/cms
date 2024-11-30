import { TSearchedVideos } from '@/app/api/search/route';
import VideoSearchCard from './VideoSearchCard';
import VideoSearchInfo from './VideoSearchInfo';
import VideoSearchLoading from './VideoSearchLoading';

interface SearchResultsProps {
  isVisible: boolean;
  isMobile: boolean;
  searchTerm: string;
  loading: boolean;
  searchedVideos: TSearchedVideos[] | null;
  selectedIndex: number;
  onCardClick: (videoUrl: string) => void;
}

export function SearchResults({
  isVisible,
  isMobile,
  searchTerm,
  loading,
  searchedVideos,
  selectedIndex,
  onCardClick,
}: SearchResultsProps) {
  if (!isVisible) return null;

  const renderSearchResults = () => {
    if (searchTerm.length < 3) {
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

    return searchedVideos.map((video, index) => (
      <div
        key={video.id}
        className={`${index === selectedIndex ? 'bg-blue-600/10 text-blue-600' : ''}`}
      >
        <VideoSearchCard video={video} onCardClick={onCardClick} />
      </div>
    ));
  };

  return (
    <div
      className={`absolute ${
        isMobile ? 'top-full' : 'top-12'
      } z-30 max-h-[40vh] w-full overflow-y-scroll rounded-lg border-2 bg-background p-2 shadow-lg`}
    >
      {renderSearchResults()}
    </div>
  );
}
