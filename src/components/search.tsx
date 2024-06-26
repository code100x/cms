'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
    <div className="mb-2 flex w-full max-w-md items-center space-x-4">
      <Input
        aria-label="Search Input"
        className="flex-grow"
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input type="submit" hidden />
      <Button className="w-auto" type="submit" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default Search;
