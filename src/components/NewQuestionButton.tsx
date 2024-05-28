import React from 'react';

import Link from 'next/link';
import { QueryParams } from '@/actions/types';
import { getUpdatedUrl } from '@/lib/utils';

interface PropsType {
  searchParams: QueryParams;
}
export default function NewQuestionButton({ searchParams }: PropsType) {
  return (
    <Link
      className=" bg-black  text-white h-10  truncate  text-sm font-medium dark:bg-white dark:text-black light:text-black transition-colors duration-500 sticky p-3 rounded-md "
      href={getUpdatedUrl('/questions', searchParams, {
        newPost:
          searchParams.newPost === 'close' || !searchParams.newPost
            ? 'open'
            : 'close',
      })}
    >
      New Question
    </Link>
  );
}
