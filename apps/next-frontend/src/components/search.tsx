'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@repo/ui/shad/input';
import { Button } from '@repo/ui/shad/button';
import { getUpdatedUrl, searchParamsToObject } from '@repo/common/lib/utils';

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
    <div className="flex w-full max-w-md items-center space-x-4  mb-2">
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
