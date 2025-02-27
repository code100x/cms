'use client';

import { usePathname } from 'next/navigation';
import { FilterContent } from '@/components/FilterContent';

const FilterContainer = () => {
  const pathname = usePathname();

  const hideFilter = pathname.split('/').length > 4;

  if (hideFilter) {
    return null;
  }

  return <FilterContent />;
};

export default FilterContainer;
