'use client';
import { BountyInfoType, UserInfoType } from './UserPage';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table';
import React, { useCallback, useMemo, useState } from 'react';
import BountyInfo from './BountyInfo';
import SidebarInfo from './SidebarInfo';
import BountyTitle from './BountyTitle';

export interface UserBountyType {
  allUserInfo: UserInfoType[];
  bountyInfo: BountyInfoType[];
}

export const formatUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatINR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export default function AdminPage({ allInfo }: { allInfo: UserBountyType }) {
  const [isUSD, setIsUSD] = useState<boolean>(true);

  if (!allInfo) {
    return;
  }

  const getTotalAmount = useCallback(
    ({ bountyInfo }: { bountyInfo: BountyInfoType[] | null }) => {
      if (!bountyInfo) return;
      return isUSD
        ? formatUSD
            .format(
              bountyInfo.reduce(
                (result, value) => result + value.USD_amount,
                0,
              ),
            )
            .split('.')[0] || 0
        : formatUSD
            .format(
              bountyInfo.reduce(
                (result, value) => result + value.INR_amount,
                0,
              ),
            )
            .split('.')[0] || 0;
    },
    [allInfo],
  );

  const totalBounty = useMemo(() => {
    let usdBounty = 0;
    let inrBounty = 0;
    allInfo.allUserInfo.forEach((user) => {
      if (user.bountyInfo) {
        inrBounty += user.bountyInfo.reduce(
          (result, value) => result + value.INR_amount,
          0,
        );
        usdBounty += user.bountyInfo.reduce(
          (result, value) => result + value.USD_amount,
          0,
        );
      }
    });
    inrBounty += allInfo.bountyInfo.reduce(
      (result, value) => result + value.INR_amount,
      0,
    );
    usdBounty += allInfo.bountyInfo.reduce(
      (result, value) => result + value.USD_amount,
      0,
    );
    return { inrBounty, usdBounty };
  }, [allInfo]);

  const indexedBountyInfo = useMemo(() => {
    let continuousIndex = 0;
    return allInfo.allUserInfo.flatMap(
      (userInfo) =>
        userInfo.bountyInfo?.map((info) => ({
          ...info,
          index: continuousIndex++,
        })) || [],
    );
  }, [allInfo]);

  const totalPr = useMemo(() => {
    let myPr = 0;
    allInfo.allUserInfo.forEach((user) => {
      if (user.bountyInfo) {
        myPr += user.bountyInfo.length;
      }
    });

    myPr += allInfo.bountyInfo.length;

    return myPr;
  }, [allInfo]);

  const repoName = useMemo(() => {
    const repoCounts: { [key: string]: number } = {};
    allInfo.allUserInfo.forEach((user) => {
      if (user.bountyInfo) {
        user.bountyInfo.forEach((bounty) => {
          const repoName = bounty.repoName;
          if (repoCounts[repoName]) {
            repoCounts[repoName]++;
          } else {
            repoCounts[repoName] = 1;
          }
        });
      }
    });

    allInfo.bountyInfo.forEach((bounty) => {
      const repoName = bounty.repoName;

      if (repoCounts[repoName]) {
        repoCounts[repoName]++;
      } else {
        repoCounts[repoName] = 1;
      }
    });

    return repoCounts;
  }, [allInfo]);

  return (
    <div className="grid grid-cols-1 gap-8 p-6 dark:bg-gray-950 dark:text-gray-50 md:grid-cols-[300px_1fr] md:p-10">
      <SidebarInfo
        totalBounty={totalBounty}
        totalPr={totalPr}
        repoName={repoName}
        role={'admin'}
      />
      <Tabs defaultValue="bounty">
        <div className="mb-4 text-center">
          <TabsList>
            <TabsTrigger value="bounty">Bounty</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
          </TabsList>
        </div>
        <div className="rounded-lg border-4 shadow-md dark:bg-slate-900">
          <div className="p-6">
            <TabsContent value="bounty">
              {allInfo.bountyInfo.length > 0 && (
                <h3 className="mb-4 text-lg font-semibold">
                  Bounties with Linked Github Account
                </h3>
              )}
              <Table>
                <BountyTitle isUSD={isUSD} setIsUSD={setIsUSD} />

                {indexedBountyInfo.map((info) => (
                  <BountyInfo
                    key={info.id}
                    bountyInfo={info}
                    index={info.index}
                    isUSD={isUSD}
                  />
                ))}
              </Table>
              {allInfo.bountyInfo.length > 0 && (
                <>
                  <h3 className="my-4 text-lg font-semibold">
                    Bounties without Linked Github Account
                  </h3>
                  <Table>
                    <BountyTitle isUSD={isUSD} setIsUSD={setIsUSD} />

                    {allInfo.bountyInfo.map((info, index) => (
                      <BountyInfo
                        key={info.id}
                        bountyInfo={info}
                        index={index}
                        isUSD={isUSD}
                      />
                    ))}
                  </Table>
                </>
              )}
            </TabsContent>
            <TabsContent value="user">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Total PR</TableHead>
                    <TableHead>
                      Amount
                      <button
                        onClick={() => setIsUSD((prev) => !prev)}
                        className="m-1 rounded-lg border border-neutral-500 px-2 py-1"
                      >
                        {isUSD ? '$' : '₹'}
                      </button>
                    </TableHead>
                    <TableHead>Account</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allInfo.allUserInfo.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.publicName || 'No Name'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        {user.bountyInfo && user.bountyInfo?.length > 0
                          ? user.bountyInfo.length
                          : '0'}
                      </TableCell>
                      <TableCell>
                        {getTotalAmount({ bountyInfo: user.bountyInfo })}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/bounty/${user.userId}`}
                          className="rounded-xl bg-blue-400 px-2 py-1"
                        >
                          Visit
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
