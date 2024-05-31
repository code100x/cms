'use client';

import { formatINR, formatUSD } from './AdminPage';
import { BountyInfoType } from './UserPage';

const BountyList = ({
  info,
  index,
  isUSD,
}: {
  info: BountyInfoType;
  index: number;
  isUSD: boolean;
}) => {
  return (
    <div
      key={info.id}
      className=" bg-gray-500 hover:bg-slate-600s grid grid-cols-7 items-center text-center border-2 border-black rounded-lg py-4 my-2 gap-1"
    >
      <div>{index + 1}</div>
      <div>{info.repoName}</div>
      <div className=" text-nowrap whitespace-nowrap overflow-ellipsis overflow-hidden col-span-2">
        {info.PR_Title}
      </div>
      <a
        className="border-2 rounded-lg mx-12 py-2 bg-zinc-700 hover:bg-slate-600"
        href={info.PR_Link}
      >
        PR
      </a>
      <div>
        {isUSD
          ? `${formatUSD.format(info.USD_amount).split('.')[0]}`
          : `${formatINR.format(info.INR_amount).split('.')[0]}`}
      </div>
      <div>{new Date(info.createdAt).toLocaleDateString('en-GB')}</div>
    </div>
  );
};

export default BountyList;
