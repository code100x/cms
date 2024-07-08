import { SearchIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import SearchBar from './SearchBar';

const MobileScreenSearch = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };
  return (
    <div className="md:hidden">
      {showSearchBar ? (
        <div className="absolute left-0 top-0 z-[100] flex h-16 w-full items-center gap-3 border-b bg-white px-3 dark:bg-[#020817]">
          <SearchBar onCardClick={toggleSearchBar} />
          <XIcon onClick={toggleSearchBar} />
        </div>
      ) : (
        <SearchIcon onClick={toggleSearchBar} size={20} className="mx-2" />
      )}
    </div>
  );
};

export default MobileScreenSearch;
