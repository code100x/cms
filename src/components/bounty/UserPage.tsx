'use client';
import { useRouter } from 'next/navigation';
import { formatINR, formatUSD } from './AdminPage';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import PaymentPopup from './PaymentPopup';
import BountyList from './BountyList';
import BountyTitle from './BountyTitle';

export interface PaymentInfoType {
  id: string;
  upiId: string;
  qrCodeImage: File | string;
  accountName: string | null;
  accountNumber: string | null;
  ifscCode: string | null;
  panNumber: string | null;
  panCardPdf: File | string | null;
  githubUserId: string;
}

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
  paymentInfo: PaymentInfoType | null;
}

const BountyUser = ({
  userInfo,
  role,
}: {
  userInfo: UserInfoType;
  role: 'user' | 'admin';
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [payTo, setPayTo] = useState<PaymentInfoType | null>(null);
  const [myUserInfo, setMyUserInfo] = useState<BountyInfoType | null>(null);
  const [isUSD, setIsUSD] = useState<boolean>(true);
  const [isLength, setIsLength] = useState<boolean | null>(false);
  const route = useRouter();

  useEffect(() => {
    setIsLength(userInfo.bountyInfo && userInfo.bountyInfo?.length > 0);
  }, [userInfo]);

  return (
    <>
      <div className=" bg-stone-700 border-2 border-black rounded-lg py-4 m-2 mb-10">
        <div className=" grid grid-cols-6 text-center items-center pb-5 text-2xl font-bold border-b-4 mb-6">
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
          {role === 'user' ? (
            <button
              onClick={() => route.push('/paymentInfo')}
              className=" border rounded-lg m-1 px-2 py-1 border-black"
            >
              Payment Info
            </button>
          ) : (
            <div className="  m-1 px-2 py-1 ">Payment Info</div>
          )}
        </div>
        <div className=" grid grid-cols-6 text-center justify-center items-center">
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
          <div>
            {!userInfo.paymentInfo?.upiId && (
              <div className=" flex  justify-center items-center gap-2 bg-red-400 rounded-xl p-2 mx-5">
                <span>Not-Added</span>
                <span className="">
                  <FaExclamationCircle fill="red" />
                </span>
              </div>
            )}
            {userInfo.paymentInfo?.upiId &&
              !userInfo.paymentInfo.accountNumber && (
                <div className=" flex  justify-center items-center gap-2 bg-blue-400 rounded-xl p-2 mx-5">
                  <span>Added</span>
                  <span className="">
                    <FaExclamationCircle fill="blue" />
                  </span>
                </div>
              )}
            {userInfo.paymentInfo?.upiId &&
              userInfo.paymentInfo.accountNumber && (
                <div className=" flex  justify-center items-center gap-2 bg-green-400 rounded-xl p-2 mx-5">
                  <span>Added</span>
                  <span className="">
                    <FaCheckCircle fill="green" />
                  </span>
                </div>
              )}
            {/* {userInfo.paymentInfo && userInfo.paymentInfo?.upiId ? (
              userInfo.paymentInfo.accountName ? (
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
                userInfo={userInfo}
                info={info}
                index={index}
                role={role}
                setShowPopup={setShowPopup}
                setPayTo={setPayTo}
                setMyUserInfo={setMyUserInfo}
                isUSD={isUSD}
              />
            ))}
          {showPopup && (
            <PaymentPopup
              setShowPopup={setShowPopup}
              payTo={payTo as PaymentInfoType}
              myUserInfo={myUserInfo as BountyInfoType}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BountyUser;
