'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { BountyInfoType, PaymentInfoType } from './UserPage';
import { toast } from 'sonner';
import { formatINR, formatUSD } from './AdminPage';
import Link from 'next/link';
import axios from 'axios';

const PaymentPopup = ({
  setShowPopup,
  payTo,
  myUserInfo,
}: {
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  payTo: PaymentInfoType;
  myUserInfo: BountyInfoType;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div
      className=" fixed inset-0 bg-black/80 flex justify-center h-screen  items-center"
      onClick={() => setShowPopup(false)}
    >
      <div
        className={`bg-white p-4 rounded-lg ${myUserInfo?.USD_amount && myUserInfo.USD_amount < 100 ? 'w-[40%] max-w-md' : 'w-[70%] max-w-xl'} mt-16   max-h-[80%] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {myUserInfo?.USD_amount && myUserInfo.USD_amount < 100 ? (
          <div>
            <div className=" bg-stone-500 text-xl py-2 font-bold text-center rounded-xl">
              <div>UPI ID</div>
              <div>{payTo?.upiId}</div>
            </div>
            <div className=" rounded-xl my-2">
              <img src={payTo?.qrCodeImage as string} alt="qrCode" />
            </div>
          </div>
        ) : (
          <div className=" bg-stone-500 text-xl border py-2 font-bold text-center rounded-xl my-6 px-3 grid grid-cols-3">
            <div className=" text-left flex flex-col gap-3 col-span-1">
              <div>Account Name:</div>
              <div>Account Number:</div>
              <div>IFSC Code:</div>
              <div>Pan Number:</div>
              <div>Pan Card:</div>
            </div>
            <div className=" flex flex-col gap-3 col-span-2">
              <div>{payTo?.accountName}</div>
              <div>{payTo?.accountNumber}</div>
              <div>{payTo?.ifscCode}</div>
              <div>{payTo?.panNumber}</div>
              <button className=" bg-neutral-700 px-4 py-1 rounded-xl col-span-2">
                <Link href={payTo?.panCardPdf as string} target="_blank">
                  View
                </Link>
              </button>
            </div>
          </div>
        )}
        <button
          className={`w-full py-2 bg-blue-600 ${!isLoading ? 'hover:bg-blue-900' : 'bg-blue-600'} rounded-xl sticky bottom-2 font-bold text-xl`}
          onClick={async () => {
            setIsLoading(true);
            try {
              const response = await axios('/api/bounty', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                data: { id: myUserInfo?.id },
              });
              const data = response.data;

              if (data.message === 'ok') {
                setShowPopup(false);
                setIsLoading(false);
                toast.success('Paid Successfully');
              } else {
                setShowPopup(false);
                setIsLoading(false);
                toast.error('Error while Paying');
              }
            } catch (e) {
              setShowPopup(false);
              setIsLoading(false);
              toast.error('Error while Paying');
            }
          }}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>
              Pay{' '}
              {myUserInfo?.USD_amount &&
                formatINR.format(myUserInfo.INR_amount).split('.')[0]}
              (
              {myUserInfo?.USD_amount &&
                formatUSD.format(myUserInfo.USD_amount).split('.')[0]}
              )
            </span>
          )}
        </button>
        <button
          className="w-full py-2 bg-green-600 hover:bg-green-800 rounded-xl  mt-2"
          disabled={isLoading}
          onClick={() => setShowPopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
