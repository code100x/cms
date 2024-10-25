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
  const paramsObj = searchParamsToObject(searchParams as any); // build fix (eslint)

  const handleSearch = () => {
    router.push(getUpdatedUrl(path, paramsObj, { search }));
  };
  return (
    <div className="relative flex h-10 w-full items-center md:w-[300px] lg:w-[400px] xl:w-[500px]">
      <SearchIcon className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        aria-label="Search Input"
        className="focus:ring-none rounded-lg border-none bg-primary/5 px-10 text-base focus:outline-none"
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input type="submit" hidden />
      <Button size={'sm'} type="submit" onClick={handleSearch}>
        <p className="hidden md:block">Search</p>
        <SearchIcon className="block h-4 w-4 md:hidden" />
      </Button>
    </div>
  );
};

export default Search;
