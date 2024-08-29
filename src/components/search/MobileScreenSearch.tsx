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
      <div
        className={`absolute left-0 ${showSearchBar ? 'top-24' : '-top-24'} z-[99999] w-full transition-all duration-300 ease-in-out`}
      >
        <div
          className={`flex h-16 w-full items-center gap-3 rounded-xl bg-background px-4 py-6`}
        >
          <SearchBar onCardClick={toggleSearchBar} />
        </div>
      </div>
      {showSearchBar ? (
        <XIcon onClick={toggleSearchBar} size={20} className="mx-2" />
      ) : (
        <SearchIcon onClick={toggleSearchBar} size={20} className="mx-2" />
      )}
    </div>
  );
};

export default MobileScreenSearch;
