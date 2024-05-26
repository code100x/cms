'use client';
import { useState } from 'react';
import { BountyInfoType, PaymentInfoType, UserInfoType } from './UserPage';
import { ToggleLeftIcon, ToggleRightIcon } from 'lucide-react';
import Link from 'next/link';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import PaymentPopup from './PaymentPopup';
import BountyList from './BountyList';
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

const BountyAdmin = ({ allInfo }: { allInfo: UserBountyType }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [payTo, setPayTo] = useState<PaymentInfoType | null>(null);
  const [myUserInfo, setMyUserInfo] = useState<BountyInfoType | null>(null);
  const [isUSD, setIsUSD] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);
  if (!allInfo) {
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
            <div className=" grid grid-cols-12 items-center text-center">
              <div>No.</div>
              <div className=" col-span-2">Name</div>
              <div className=" col-span-2">Email</div>
              <div className=" col-span-2">Username</div>
              <div className=" col-span-1">Total Bounty PR</div>
              <div className=" col-span-2">
                Total Bounty
                <button
                  onClick={() => setIsUSD((prev) => !prev)}
                  className=" border rounded-lg m-1 px-2 py-1 border-black"
                >
                  {isUSD ? '$' : '₹'}
                </button>
              </div>
              <div className="col-span-2">Payment Info</div>
            </div>

            {allInfo.allUserInfo.map((user, index) => (
              <Link
                key={user.userId}
                href={`/bounty/${user.userId}`}
                className=" bg-gray-500 hover:bg-slate-600  grid grid-cols-12 items-center text-center border-2 border-black rounded-lg py-4 my-2"
              >
                <div>{index + 1}</div>
                <div className=" col-span-2">
                  {user.publicName || 'No Name'}
                </div>
                <div className=" col-span-2">{user.email}</div>
                <div className=" col-span-2">{user.username}</div>
                <div className=" col-span-1">
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
                  <div className=" col-span-2">0</div>
                )}
                <div className=" col-span-2">
                  {!user.paymentInfo?.upiId && (
                    <div className=" flex  justify-center items-center gap-2 bg-red-400 rounded-xl p-2 mx-5">
                      <span>Not-Added</span>
                      <span className="">
                        <FaExclamationCircle fill="red" />
                      </span>
                    </div>
                  )}
                  {user.paymentInfo?.upiId &&
                    !user.paymentInfo.accountNumber && (
                      <div className=" flex  justify-center items-center gap-2 bg-blue-400 rounded-xl p-2 mx-5">
                        <span>Added</span>
                        <span className="">
                          <FaExclamationCircle fill="blue" />
                        </span>
                      </div>
                    )}
                  {user.paymentInfo?.upiId &&
                    user.paymentInfo.accountNumber && (
                      <div className=" flex  justify-center items-center gap-2 bg-green-400 rounded-xl p-2 mx-5">
                        <span>Added</span>
                        <span className="">
                          <FaCheckCircle fill="green" />
                        </span>
                      </div>
                    )}

                  {/* {user.bountyInfo && user.paymentInfo?.upiId ? (
                    user.paymentInfo.accountName ? (
                      <div className=" flex  justify-center items-center gap-2 bg-green-400 rounded-xl p-2 mx-5">
                        <span>Added</span>
                        <span className="">
                          <FaCheckCircle fill="green" />
                        </span>
                      </div>
                    ) : (
                      <div className=" flex  justify-center items-center gap-2 bg-blue-400 rounded-xl p-2 mx-5">
                        <span>Added</span>
                        <span className="">
                          <FaExclamationCircle fill="blue" />
                        </span>
                      </div>
                    )
                  ) : (
                    <div className=" flex  justify-center items-center gap-2 bg-red-400 rounded-xl p-2 mx-5">
                      <span>Not-Added</span>
                      <span className="">
                        <FaExclamationCircle fill="red" />
                      </span>
                    </div>
                  )} */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {isUser && (
        <div className=" bg-gray-800 items-center border-2 border-black rounded-lg p-4 m-2 ">
          <BountyTitle isUSD={isUSD} setIsUSD={setIsUSD} />
          <div>
            {allInfo.allUserInfo.map((userInfo) => (
              <div key={userInfo.id}>
                {userInfo.bountyInfo?.map((info, index) => (
                  <BountyList
                    key={info.id}
                    userInfo={userInfo}
                    info={info}
                    index={index}
                    role={'admin'}
                    setShowPopup={setShowPopup}
                    setPayTo={setPayTo}
                    setMyUserInfo={setMyUserInfo}
                    isUSD={isUSD}
                  />
                ))}
              </div>
            ))}
          </div>
          {allInfo.bountyInfo.length > 0 && (
            <div className=" text-center my-4">
              <span className=" border px-6 py-2 rounded-xl font-bold text-2xl">
                Bounties without Linked Github Account
              </span>
            </div>
          )}
          <div>
            {allInfo.bountyInfo.map((info, index) => (
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
                {!info.isPaid && (
                  <button
                    disabled={true}
                    className=" noInfo  hover:bg-red-500 bg-stone-600 rounded-lg py-2 px-1 mx-10 hover:py-5"
                  >
                    <span>Not&nbsp;Paid</span>
                  </button>
                )}

                <div>
                  {new Date(info.createdAt).toLocaleDateString('en-GB')}
                </div>
              </div>
            ))}
          </div>
          {showPopup && (
            <PaymentPopup
              setShowPopup={setShowPopup}
              payTo={payTo as PaymentInfoType}
              myUserInfo={myUserInfo as BountyInfoType}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BountyAdmin;
