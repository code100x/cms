'use client';

import {
  getUpdatedUrl,
  paginationData,
  searchParamsToObject,
} from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
interface IPagination {
  dataLength: number
}
const Pagination: React.FC<IPagination> = ({ dataLength = 1 }) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const paramsObj = searchParamsToObject(searchParams);
  const paginationQ = paginationData(paramsObj);
  return (
    <div className="flex items-center justify-center space-x-4 ">
      {paginationQ.pageNumber > 1 && (
        <Link
          className="px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center space-x-2 dark:border-gray-600 dark:text-gray-300"
          href={getUpdatedUrl(`${path}/`, paramsObj, {
            page: paginationQ.pageNumber - 1,
            limit: paginationQ.pageSize,
          })}
        >
          <span className="material-icons flex items-center justify-center text-gray-500 w-4 h-4 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          <span className="sr-only"> {paginationQ.pageNumber - 1}</span>
        </Link>
      )}

      <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300">
        {paginationQ.pageNumber}
      </span>
      {dataLength >= paginationQ.pageSize && (
        <Link
          className="px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center space-x-2 dark:border-gray-600 dark:text-gray-300"
          href={getUpdatedUrl(`${path}/`, paramsObj, {
            page: paginationQ.pageNumber + 1,
            limit: paginationQ.pageSize,
          })}
        >
          <span className="material-icons flex items-center justify-center text-gray-500 w-4 h-4 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
          <span className="sr-only">{paginationQ.pageNumber + 1}</span>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
