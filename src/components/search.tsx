'use client';

import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const path = usePathname();
  const paramsObj = useMemo(
    () => searchParamsToObject(searchParams as any),
    [searchParams],
  );

  const handleSearch = useCallback(() => {
    const updatedUrl = getUpdatedUrl(path, paramsObj, { search });
    router.push(updatedUrl);
  }, [router, path, paramsObj, search]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch],
  );

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleSearch();
    },
    [handleSearch],
  );

  return (
    <form
      onKeyDown={handleKeyDown}
      className="relative flex h-10 w-full items-center md:w-[300px] lg:w-[400px] xl:w-[500px]"
    >
      <SearchIcon className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        aria-label="Search Input"
        className="focus:ring-none rounded-lg rounded-r-none border-none bg-primary/5 pl-12 text-base focus:outline-none"
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        size={'sm'}
        type="submit"
        className="h-full rounded-l-none"
        onClick={handleButtonClick}
      >
        <p className="hidden md:block">Search</p>
        <SearchIcon className="block h-4 w-4 md:hidden" />
      </Button>
    </form>
  );
};

export default Search;
