'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const path = usePathname();
  const paramsObj = searchParamsToObject(searchParams);

  const handleSearch = () => {
    router.push(getUpdatedUrl(path, paramsObj, { search }));
  };
  return (
    <div className="relative flex h-10 w-full items-center space-x-2 md:w-[500px] lg:w-[300px] xl:w-[400px]">
      <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        aria-label="Search Input"
        className="rounded-lg border-gray-300 bg-gray-50 px-10 text-base focus:outline-none dark:border-gray-700/50 dark:bg-transparent dark:text-white dark:placeholder-gray-400"
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input type="submit" hidden />
      <Button
        className="me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2 text-center text-sm font-medium hover:bg-gradient-to-br dark:text-white"
        type="submit"
        onClick={handleSearch}
      >
        <p className="hidden md:block">Search</p>
        <SearchIcon className="block h-4 w-4 md:hidden" />
      </Button>
    </div>
  );
};

export default Search;
