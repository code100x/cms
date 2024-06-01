'use client';
import { Dispatch, SetStateAction } from 'react';
import { TableHeader, TableRow, TableHead } from '../ui/table';

const BountyTitle = ({
  isUSD,
  setIsUSD,
}: {
  isUSD: boolean;
  setIsUSD: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TableHeader>
      <TableRow className=" grid grid-cols-12 w-full">
        <TableHead>No.</TableHead>
        <TableHead className=" col-span-2">Repo Name</TableHead>
        <TableHead className=" col-span-3">PR Title</TableHead>
        <TableHead className=" col-span-2">PR Link</TableHead>
        <TableHead className=" col-span-2">
          Amount
          <button
            onClick={() => setIsUSD((prev) => !prev)}
            className=" border rounded-lg m-1 px-2 py-1 border-neutral-500"
          >
            {isUSD ? '$' : '₹'}
          </button>
        </TableHead>
        <TableHead className=" col-span-2">Created Date</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BountyTitle;
