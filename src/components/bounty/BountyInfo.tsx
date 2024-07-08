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
      <TableRow className="grid w-full grid-cols-12">
        <TableCell>{index + 1}</TableCell>
        <TableCell className="col-span-2">{bountyInfo?.repoName}</TableCell>
        <TableCell className="col-span-3 overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap">
          {bountyInfo?.PR_Title}
        </TableCell>
        <TableCell className="col-span-2 text-blue-400 no-underline">
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
