'use client';
import { TableRow, TableBody, TableCell } from '../ui/table';
import { BountyInfoType } from './UserPage';
import { formatINR, formatUSD } from './AdminPage';

const BountyInfo = ({
  bountyInfo,
  index,
  isUSD,
}: {
  bountyInfo: BountyInfoType;
  index: number;
  isUSD: boolean;
}) => {
  return (
    <TableBody>
      <TableRow className=" grid grid-cols-12 w-full">
        <TableCell>{index + 1}</TableCell>
        <TableCell className=" col-span-2">{bountyInfo?.repoName}</TableCell>
        <TableCell className=" col-span-3 text-nowrap whitespace-nowrap overflow-ellipsis overflow-hidden">
          {bountyInfo?.PR_Title}
        </TableCell>
        <TableCell className="text-blue-400 no-underline col-span-2">
          <a href={bountyInfo?.PR_Link} target="_blank">
            View PR
          </a>
        </TableCell>
        <TableCell className="col-span-2">
          {isUSD
            ? `${formatUSD.format(bountyInfo?.USD_amount).split('.')[0]}`
            : `${formatINR.format(bountyInfo?.INR_amount).split('.')[0]}`}
        </TableCell>
        <TableCell className="text-centers col-span-2">
          {new Date(bountyInfo?.createdAt).toLocaleDateString('en-GB')}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default BountyInfo;
