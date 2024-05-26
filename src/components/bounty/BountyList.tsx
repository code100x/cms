'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { formatINR, formatUSD } from './AdminPage';
import { BountyInfoType, PaymentInfoType, UserInfoType } from './UserPage';

const BountyList = ({
  userInfo,
  info,
  index,
  role,
  setShowPopup,
  setPayTo,
  setMyUserInfo,
  isUSD,
}: {
  userInfo: UserInfoType;
  info: BountyInfoType;
  index: number;
  role: 'user' | 'admin';
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  setPayTo: Dispatch<SetStateAction<PaymentInfoType | null>>;
  setMyUserInfo: Dispatch<SetStateAction<BountyInfoType | null>>;
  isUSD: boolean;
}) => {
  const [toDisplay, setToDisplay] = useState<boolean>(false);
  useEffect(() => {
    if (info.USD_amount < 100 && userInfo.paymentInfo?.upiId) {
      setToDisplay(true);
    } else if (info.USD_amount > 100 && userInfo.paymentInfo?.accountNumber) {
      setToDisplay(true);
    } else {
      setToDisplay(false);
    }
  }, [info.USD_amount, userInfo.paymentInfo]);
  return (
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
      {!info.isPaid &&
        (role === 'user' ? (
          <button
            disabled={true}
            className=" bg-blue-500 rounded-lg py-2 px-2 mx-9"
          >
            <span>Not&nbsp;Paid</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setShowPopup(true);
              setPayTo(userInfo.paymentInfo);
              setMyUserInfo(info);
            }}
            disabled={!toDisplay}
            className={`${toDisplay ? 'pay  hover:bg-blue-500' : 'noInfo  hover:bg-red-500'} bg-stone-600 rounded-lg py-2 px-1 mx-10 hover:py-5`}
          >
            <span>Not&nbsp;Paid</span>
          </button>
        ))}

      <div>{new Date(info.createdAt).toLocaleDateString('en-GB')}</div>
    </div>
  );
};

export default BountyList;
