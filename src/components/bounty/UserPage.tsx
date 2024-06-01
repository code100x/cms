'use client';
import { Table } from '../ui/table';
import React, { useMemo, useState } from 'react';
import BountyInfo from './BountyInfo';
import SidebarInfo from './SidebarInfo';
import BountyTitle from './BountyTitle';

export interface BountyInfoType {
  id: number;
  username: string;
  PR_Link: string;
  PR_Title: string;
  repoName: string;
  USD_amount: number;
  INR_amount: number;
  createdAt: Date;
  githubUserId: string | null;
}

export interface UserInfoType {
  id: number;
  userId: string;
  username: string;
  email: string | null;
  image: string | null;
  publicName: string | null;
  isLinked: boolean;
  bountyInfo: BountyInfoType[] | null;
}

export default function UserPage({ userInfo }: { userInfo: UserInfoType }) {
  const [isUSD, setIsUSD] = useState<boolean>(true);

  const totalBounty = useMemo(() => {
    let usdBounty = 0;
    let inrBounty = 0;

    if (userInfo.bountyInfo && userInfo.bountyInfo?.length > 0) {
      inrBounty = userInfo.bountyInfo.reduce(
        (result, value) => result + value.INR_amount,
        0,
      );
      usdBounty = userInfo.bountyInfo.reduce(
        (result, value) => result + value.USD_amount,
        0,
      );
    }
    return { inrBounty, usdBounty };
  }, [userInfo]);

  const totalPr = useMemo(() => {
    let myPr = 0;
    if (userInfo.bountyInfo && userInfo.bountyInfo?.length > 0) {
      myPr = userInfo.bountyInfo?.length;
    }
    return myPr;
  }, [userInfo]);

  const repoName = useMemo(() => {
    const repoCounts: { [key: string]: number } = {};
    userInfo.bountyInfo?.forEach((bounty) => {
      const repoName = bounty.repoName;
      if (repoCounts[repoName]) {
        repoCounts[repoName]++;
      } else {
        repoCounts[repoName] = 1;
      }
    });
    return repoCounts;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6 md:p-10 dark:bg-gray-950 dark:text-gray-50">
      <SidebarInfo
        userInfo={userInfo}
        totalBounty={totalBounty}
        totalPr={totalPr}
        repoName={repoName}
        role={'user'}
      />
      <div className="dark:bg-slate-900 rounded-lg shadow-md border-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Bounty Info</h2>
          <Table>
            <BountyTitle isUSD={isUSD} setIsUSD={setIsUSD} />
            {userInfo.bountyInfo &&
              userInfo.bountyInfo?.length > 0 &&
              userInfo.bountyInfo?.map((info, index) => (
                <BountyInfo
                  key={index}
                  bountyInfo={info}
                  index={index}
                  isUSD={isUSD}
                />
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
