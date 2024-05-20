'use client';
import { formatINR, formatUSD } from './BountyAdmin';
import { useEffect, useState } from 'react';

export interface BountyInfoType {
  id: number;
  username: string;
  PR_Link: string;
  PR_Title: string;
  repoName: string;
  USD_amount: number;
  INR_amount: number;
  isPaid: boolean;
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

const BountyUser = ({
  userInfo,
  role,
}: {
  userInfo: UserInfoType;
  role: 'user' | 'admin';
}) => {
  const [isUSD, setIsUSD] = useState<boolean>(true);
  const [isLength, setIsLength] = useState<boolean | null>(false);

  useEffect(() => {
    setIsLength(userInfo.bountyInfo && userInfo.bountyInfo?.length > 0);
  }, [userInfo]);

  if (!userInfo) {
    return <div>Contribute to github</div>;
  }

  return (
    <>
      <div className=" bg-stone-700 border-2 border-black rounded-lg p-4 m-2 mb-10">
        <div className=" grid grid-cols-5 text-center items-center pb-5 text-2xl font-bold border-b-4 mb-6">
          <div>Name</div>
          <div>Email</div>
          <div>Username</div>
          <div>Total Bounty PR</div>
          <div>
            Total Bounty In
            <button
              onClick={() => setIsUSD((prev) => !prev)}
              className=" border rounded-lg m-1 px-2 py-1 border-black"
            >
              {isUSD ? '$' : '₹'}
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-5 text-center">
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
      <div>
        {isLength && (
          <div className=" bg-gray-800 items-center border-2 border-black rounded-lg p-4 m-2 ">
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
            {userInfo.bountyInfo?.map((info, index) => (
              <div
                key={info.id}
                className=" bg-gray-500 hover:bg-slate-600s grid grid-cols-8 items-center text-center border-2 border-black rounded-lg py-4 my-2 gap-1"
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
                {info.isPaid && (
                  <button
                    disabled={true}
                    className=" bg-green-600 rounded-lg py-2 px-2 mx-9 "
                  >
                    Paid
                  </button>
                )}
                {!info.isPaid && role === 'user' ? (
                  <button
                    disabled={true}
                    className=" bg-blue-500 rounded-lg py-2 px-2 mx-9"
                  >
                    <span>Not&nbsp;Paid</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="  bg-stone-600 rounded-lg py-2 px-1 mx-10 hover:py-5 hover:bg-blue-500"
                  >
                    <span>Not&nbsp;Paid</span>
                  </button>
                )}

                <div>{info.createdAt.toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BountyUser;
