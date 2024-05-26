'use client';

import { Dispatch, SetStateAction } from 'react';

const BountyTitle = ({
  isUSD,
  setIsUSD,
}: {
  isUSD: boolean;
  setIsUSD: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className=" grid grid-cols-8 items-center text-center">
      <div>No.</div>
      <div>Repo Name</div>
      <div className=" col-span-2">PR Title</div>
      <div>PR Link</div>
      <div>
        Amount in
        <button
          className=" border-2 rounded-lg m-1 px-2 py-1 border-black"
          onClick={() => setIsUSD((prev) => !prev)}
        >
          {isUSD ? '$' : '₹'}
        </button>
      </div>
      <div>Payment</div>
      <div>Created Date</div>
    </div>
  );
};

export default BountyTitle;
