'use client';
import { useState } from 'react';
import { BountyInfoType, UserInfoType } from './BountyUser';
import { ToggleLeftIcon, ToggleRightIcon } from 'lucide-react';
import Link from 'next/link';

export interface UserBountyType {
  userInfo: UserInfoType[];
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

const BountyAdmin = ({
  allGithubBountyInfo,
}: {
  allGithubBountyInfo: UserBountyType;
}) => {
  const [isUSD, setIsUSD] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);

  if (!allGithubBountyInfo) {
    return;
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className=" bg-stone-400 rounded-lg py-2 px-4 my-4"
          onClick={() => {
            setIsUser((p) => !p);
          }}
        >
          <div className="flex gap-2">
            {isUser ? <ToggleLeftIcon /> : <ToggleRightIcon />}
            <span>{isUser ? 'All' : 'Users'}</span>
          </div>
        </button>
      </div>
      {!isUser && (
        <div>
          <div className=" bg-gray-800 items-center border-2 border-black rounded-lg p-4 m-2 ">
            <div className=" grid grid-cols-11 items-center text-center">
              <div>No.</div>
              <div className=" col-span-2">Name</div>
              <div className=" col-span-2">Email</div>
              <div className=" col-span-2">Username</div>
              <div className=" col-span-2">Total Bounty PR</div>
              <div className=" col-span-2">
                Total Bounty In
                <button
                  onClick={() => setIsUSD((prev) => !prev)}
                  className=" border rounded-lg m-1 px-2 py-1 border-black"
                >
                  {isUSD ? '$' : '₹'}
                </button>
              </div>
            </div>
            {allGithubBountyInfo.userInfo.map((user, index) => (
              <Link
                key={user.userId}
                href={`/bounty/${user.userId}`}
                className=" bg-gray-500 hover:bg-slate-600  grid grid-cols-11 items-center text-center border-2 border-black rounded-lg py-4 my-2"
              >
                <div>{index + 1}</div>
                <div className=" col-span-2">
                  {user.publicName || 'No Name'}
                </div>
                <div className=" col-span-2">{user.email}</div>
                <div className=" col-span-2">{user.username}</div>
                <div className=" col-span-2">
                  {user.bountyInfo && user.bountyInfo?.length > 0
                    ? user.bountyInfo.length
                    : '0'}
                </div>
                {user.bountyInfo && user.bountyInfo?.length > 0 ? (
                  <div className=" col-span-2">
                    {!isUSD && (
                      <div>
                        {
                          formatINR
                            .format(
                              user.bountyInfo?.reduce(
                                (result, value) => result + value.INR_amount,
                                0,
                              ),
                            )
                            .split('.')[0]
                        }
                      </div>
                    )}
                    {isUSD && (
                      <div>
                        {
                          formatUSD
                            .format(
                              user.bountyInfo?.reduce(
                                (result, value) => result + value.USD_amount,
                                0,
                              ),
                            )
                            .split('.')[0]
                        }
                      </div>
                    )}
                  </div>
                ) : (
                  '0'
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
      {isUser && (
        <div className=" bg-gray-800 items-center border-2 border-black rounded-lg p-4 m-2 ">
          <div className=" grid grid-cols-9 items-center text-center">
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
            <div>Account Linked</div>
          </div>
          {allGithubBountyInfo.bountyInfo?.map((info, index) => (
            <div
              key={info.id}
              className=" bg-gray-500  grid grid-cols-9 items-center text-center border-2 border-black rounded-lg py-4 my-2 gap-1"
            >
              <div>{index + 1}</div>
              <div>{info.repoName}</div>
              <div className=" text-nowrap whitespace-nowrap overflow-ellipsis overflow-hidden col-span-2">
                {info.PR_Title}
              </div>
              <a
                className="border-2 rounded-lg mx-10 py-2 bg-zinc-700 hover:bg-slate-600"
                href={info.PR_Link}
              >
                PR
              </a>
              <div>
                {isUSD
                  ? `${formatUSD.format(info.USD_amount).split('.')[0]}`
                  : `${formatINR.format(info.INR_amount).split('.')[0]}`}
              </div>
              {info.isPaid ? (
                <button
                  disabled={true}
                  className="bg-green-400 w-24 relative rounded-lg py-2 px-1 mx-10"
                >
                  Paid
                </button>
              ) : (
                <button
                  type="submit"
                  className="  bg-stone-600 rounded-lg py-2 px-1 mx-10 hover:py-5 hover:bg-blue-500"
                >
                  <span>Not&nbsp;Paid</span>
                </button>
              )}
              <div className=" text-right">
                {info.createdAt.toLocaleDateString()}
              </div>
              <div>{info.githubUserId ? 'Yes' : 'No'}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BountyAdmin;
