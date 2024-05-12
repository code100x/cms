import { SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

const MobileScreenSearch = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'KeyK' && event.ctrlKey) {
        event.preventDefault();
        toggleSearchBar();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="md:hidden">
      {showSearchBar ? (
        <div className="absolute top-0 px-3 left-0 h-16 bg-white dark:bg-[#020817] border-b z-[100] w-full flex items-center gap-3">
          <SearchBar onCardClick={toggleSearchBar} />
          <XIcon onClick={toggleSearchBar} />
        </div>
      ) : (
        <SearchIcon onClick={toggleSearchBar} size={18} />
      )}
    </div>
  );
};

export default MobileScreenSearch;
