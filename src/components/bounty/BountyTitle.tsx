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
      <TableRow className="grid w-full grid-cols-12">
        <TableHead>No.</TableHead>
        <TableHead className="col-span-2">Repo Name</TableHead>
        <TableHead className="col-span-3">PR Title</TableHead>
        <TableHead className="col-span-2">PR Link</TableHead>
        <TableHead className="col-span-2">
          Amount
          <button
            onClick={() => setIsUSD((prev) => !prev)}
            className="m-1 rounded-lg border border-neutral-500 px-2 py-1"
          >
            {isUSD ? '$' : '₹'}
          </button>
        </TableHead>
        <TableHead className="col-span-2">Created Date</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BountyTitle;
