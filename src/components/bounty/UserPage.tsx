'use client';
import { formatINR, formatUSD } from './AdminPage';
import { useEffect, useState } from 'react';
import BountyList from './BountyList';
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
  publicName: string | null;
  isLinked: boolean;
  bountyInfo: BountyInfoType[] | null;
}

const UserPage = ({ userInfo }: { userInfo: UserInfoType }) => {
  const [isUSD, setIsUSD] = useState<boolean>(true);
  const [isLength, setIsLength] = useState<boolean | null>(false);

  useEffect(() => {
    setIsLength(userInfo.bountyInfo && userInfo.bountyInfo?.length > 0);
  }, [userInfo]);

  return (
    <>
      <div className=" bg-stone-700 border-2 border-black rounded-lg py-4 m-2 mb-10">
        <div className=" grid grid-cols-5 text-center items-center pb-5 text-2xl font-bold border-b-4 mb-6">
          <div>Name</div>
          <div>Email</div>
          <div>Username</div>
          <div>Total Bounty PR</div>
          <div>
            Total Bounty
            <button
              onClick={() => setIsUSD((prev) => !prev)}
              className=" border rounded-lg m-1 px-2 py-1 border-black"
            >
              {isUSD ? '$' : '₹'}
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-5 text-center justify-center items-center">
          <div>{userInfo.publicName}</div>
          <div>{userInfo.email}</div>
          <div>{userInfo.username}</div>
          <div>{isLength ? userInfo.bountyInfo?.length : '0'}</div>
          {isLength ? (
            <div>
              {!isUSD &&
                userInfo.bountyInfo &&
                formatINR
                  .format(
                    userInfo.bountyInfo.reduce(
                      (result, value) => result + value.INR_amount,
                      0,
                    ),
                  )
                  .split('.')[0]}

              {isUSD &&
                userInfo.bountyInfo &&
                formatUSD
                  .format(
                    userInfo.bountyInfo?.reduce(
                      (result, value) => result + value.USD_amount,
                      0,
                    ),
                  )
                  .split('.')[0]}
            </div>
          ) : (
            '0'
          )}
        </div>
      </div>
      <div className=" bg-gray-800 items-center border-2 border-black rounded-lg p-4 m-2 ">
        <BountyTitle isUSD={isUSD} setIsUSD={setIsUSD} />
        <div>
          {userInfo.bountyInfo &&
            userInfo.bountyInfo?.length > 0 &&
            userInfo.bountyInfo?.map((info, index) => (
              <BountyList
                key={info.id}
                info={info}
                index={index}
                isUSD={isUSD}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
