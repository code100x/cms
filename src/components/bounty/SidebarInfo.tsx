import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { UserInfoType } from './UserPage';
import { formatINR, formatUSD } from './AdminPage';

interface totalBounty {
  inrBounty: number;
  usdBounty: number;
}
interface repoName {
  [key: string]: number;
}

const SidebarInfo = ({
  userInfo,
  totalBounty,
  totalPr,
  repoName,
  role,
}: {
  userInfo?: UserInfoType;
  totalBounty: totalBounty;
  totalPr: number;
  repoName: repoName;
  role: 'admin' | 'user';
}) => {
  return (
    <>
      <div className="rounded-lg border-4 shadow-md dark:bg-slate-900">
        {role === 'admin' ? (
          <div className="my-4 text-center">
            <span className="rounded-xl border px-6 py-2 text-2xl font-bold">
              Bounty Info
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userInfo?.image as string} />
              <AvatarFallback>
                {userInfo?.publicName?.split('')[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{userInfo?.publicName}</h2>
              <p className="text-gray-400">{userInfo?.email}</p>
            </div>
          </div>
        )}
        <Separator className="dark:bg-gray-800" />
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">PR Details</h3>
          <div className="grid gap-2 text-sm">
            {role === 'user' && (
              <div className="flex justify-between">
                <span className="text-gray-400">Username:</span>
                <span>{userInfo?.username}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Total PRs:</span>
              <span>{totalPr || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Bounty:(USD)</span>
              <span>
                {formatUSD.format(totalBounty.usdBounty).split('.')[0] || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Bounty:(INR)</span>
              <span>
                {formatINR.format(totalBounty.inrBounty).split('.')[0] || 0}
              </span>
            </div>
          </div>
        </div>
        <Separator className="dark:bg-gray-800" />
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Repo Details</h3>
          <div className="grid gap-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold">Repo</h4>
              </div>
              <div>
                <h4 className="font-semibold">Total PRs</h4>
              </div>
            </div>
            {Object.keys(repoName).map((name, i) => {
              return (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-400">{name}</span>
                  <span>{repoName[name] || '0'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarInfo;
