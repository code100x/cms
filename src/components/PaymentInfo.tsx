/**
 * Check DB for details
 * First need to write UPI details to get payment
 * After successful, Provide Bank detail page with PAN info (as all user may not have PAN Card)
 */

'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import { toast } from 'sonner';

interface UpiFormValues {
  upiId: string;
  qrCodeImage: File | string;
}

interface BankFormValues {
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  panNumber: string;
  panCardPdf: File | string;
}

interface UpiFormErrors {
  upiId?: string;
  qrCodeImage?: string;
}

interface BankFormErrors {
  accountName?: string;
  accountNumber?: string;
  ifscCode?: string;
  panNumber?: string;
  panCardPdf?: string;
}

const PaymentInfo = () => {
  const [upiFormValues, setUpiFormValues] = useState<UpiFormValues>({
    upiId: '',
    qrCodeImage: '',
  });

  const [bankFormValues, setBankFormValues] = useState<BankFormValues>({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    panNumber: '',
    panCardPdf: '',
  });

  const [upiErrors, setUpiErrors] = useState<UpiFormErrors>({});
  const [bankErrors, setBankErrors] = useState<BankFormErrors>({});
  const [isEditUpi, setIsEditUpi] = useState<boolean>(true);
  const [isEditBank, setIsEditBank] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  if (!session) return;

  const handleUpiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpiFormValues({
      ...upiFormValues,
      [name]: value,
    });
  };

  const handleBankChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankFormValues({
      ...bankFormValues,
      [name]: value,
    });
  };

  const handleUpiFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setUpiFormValues({
        ...upiFormValues,
        [name]: files[0],
      });
    }
  };

  const handleBankFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setBankFormValues({
        ...bankFormValues,
        [name]: files[0],
      });
    }
  };

  const upiValidate = (): boolean => {
    const newErrors: UpiFormErrors = {};
    if (!upiFormValues.upiId) newErrors.upiId = 'UPI ID is required';
    if (!upiFormValues.qrCodeImage)
      newErrors.qrCodeImage = 'QR Code Image is required';
    if (
      upiFormValues.qrCodeImage instanceof File &&
      upiFormValues.qrCodeImage?.size > 5000000
    )
      newErrors.qrCodeImage = 'file size under 5 MB';
    setUpiErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const BankValidate = (): boolean => {
    const newErrors: BankFormErrors = {};
    if (!bankFormValues.accountName) newErrors.accountName = 'Name is required';
    if (!bankFormValues.accountNumber)
      newErrors.accountNumber = 'Account Number is required';
    if (!bankFormValues.ifscCode) newErrors.ifscCode = 'IFSC Code is required';
    if (!bankFormValues.panNumber)
      newErrors.panNumber = 'PAN Number is required';
    if (!bankFormValues.panCardPdf)
      newErrors.panCardPdf = 'PAN Card is required';
    if (
      bankFormValues.panCardPdf instanceof File &&
      bankFormValues.panCardPdf?.size > 5000000
    )
      newErrors.panCardPdf = 'file size under 5 MB';

    setBankErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpiInfoSubmit = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isEditUpi === false) {
      return setIsEditUpi(true);
    }
    if (upiValidate()) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('upiId', upiFormValues.upiId);
      if (upiFormValues.qrCodeImage)
        formData.append('qrCodeImage', upiFormValues.qrCodeImage);

      try {
        const response = await axios.post('/api/payment-info', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.message === 'Success') {
          toast.success('Payment info saved');
          setIsEditUpi(false);
          setIsLoading(false);
        } else {
          toast.error('Error saving payment info');
          setIsLoading(false);
        }
      } catch (error) {
        toast.error('Error saving payment info');
        setIsLoading(false);
      }
    }
  };

  const handleBankInfoSubmit = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isEditBank === false) {
      return setIsEditBank(true);
    }
    if (BankValidate()) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('accountName', bankFormValues.accountName);
      formData.append('accountNumber', bankFormValues.accountNumber);
      formData.append('ifscCode', bankFormValues.ifscCode);
      formData.append('panNumber', bankFormValues.panNumber);
      if (bankFormValues.panCardPdf)
        formData.append('panCardPdf', bankFormValues.panCardPdf);

      try {
        const response = await axios.post('/api/payment-info', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.message === 'Success') {
          toast.success('Payment info saved');
          setIsEditBank(false);
          setIsLoading(false);
        } else {
          toast.error('Error saving payment info');
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('Error saving payment info');
      }
    }
  };

  useEffect(() => {
    axios.get('/api/payment-info').then((value) => {
      if (!value.data.userInfo) {
        setIsEditUpi(true);
      } else {
        const { upiId, qrCodeImage }: UpiFormValues = value.data.userInfo;
        setUpiFormValues({ upiId, qrCodeImage });
        setIsEditUpi(false);

        if (!value.data.userInfo.accountNumber) {
          setIsEditBank(true);
        } else {
          const {
            accountName,
            accountNumber,
            ifscCode,
            panNumber,
            panCardPdf,
          }: BankFormValues = value.data.userInfo;
          setBankFormValues({
            accountName,
            accountNumber,
            ifscCode,
            panNumber,
            panCardPdf,
          });
          setIsEditBank(false);
        }
      }
    });
  }, []);

  return (
    <div className=" flex flex-col items-center gap-4 mt-24 max-w-4xl mx-auto mb-10">
      <div className=" bg-slate-700 rounded-xl p-4 border-2 w-full text-center flex gap-3 justify-center items-center">
        <span className=" font-bold text-2xl text-center pl-4">UPI Info</span>
      </div>
      <div className="border-2 rounded-xl p-4 w-full">
        <div className={' flex flex-col gap-6'}>
          <div className=" grid grid-cols-3 gap-3 ">
            <label className=" " htmlFor="upiId">
              UPI ID:
            </label>
            {isEditUpi ? (
              <input
                className=" rounded-xl my-1 py-1 px-2"
                placeholder="abc@xyz"
                id="upiId"
                name="upiId"
                type="text"
                onClick={() => setUpiErrors({})}
                onChange={handleUpiChange}
                value={upiFormValues.upiId}
              />
            ) : (
              <div className=" col-span-2">{upiFormValues.upiId}</div>
            )}
            {upiErrors.upiId && <div>{upiErrors.upiId}</div>}
          </div>

          <div className=" grid grid-cols-3 gap-3 ">
            <label className=" " htmlFor="qrCodeImage">
              QR Code Image:
            </label>
            {isEditUpi ? (
              <input
                className=" rounded-xl  py-1 px-2"
                id="qrCodeImage"
                name="qrCodeImage"
                type="file"
                accept="image/*"
                onClick={() => setUpiErrors({})}
                onChange={handleUpiFileChange}
              />
            ) : (
              <button className=" bg-neutral-700 px-4 py-1 rounded-xl col-span-2 w-[20%]">
                <Link
                  href={upiFormValues.qrCodeImage as string}
                  target="_blank"
                >
                  View
                </Link>
              </button>
            )}
            {upiErrors.qrCodeImage && <div>{upiErrors.qrCodeImage}</div>}
          </div>
        </div>
        <div
          className={`mx-autos text-center mt-4 rounded-2xl px-8 py-2 bg-stone-400 cursor-pointer${isLoading ? ' hover:bg-stone-400' : ' hover:bg-stone-600'}`}
          onClick={handleUpiInfoSubmit}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>{isEditUpi ? 'Submit' : 'Edit'}</span>
          )}
        </div>
      </div>
      {!isEditUpi && (
        <div>
          <div className=" bg-slate-700 rounded-xl p-4 border-2 w-full mt-10 text-center flex gap-3 justify-center items-center">
            <span className=" font-bold text-2xl text-center pl-4">
              Account Information
            </span>
            <span className=" ">(Needed if bounty is greater-than 100$)</span>
          </div>
          <div className=" border-2 rounded-xl p-4 w-full">
            <div className="flex flex-col gap-6">
              <div className=" grid grid-cols-3 gap-3 ">
                <label className=" " htmlFor="accountName">
                  Name:
                </label>
                {isEditBank ? (
                  <input
                    className=" rounded-xl  py-1 px-2"
                    id="accountName"
                    name="accountName"
                    type="text"
                    onClick={() => setBankErrors({})}
                    onChange={handleBankChange}
                    value={bankFormValues.accountName}
                  />
                ) : (
                  <div>{bankFormValues.accountName}</div>
                )}
                {bankErrors.accountName && <div>{bankErrors.accountName}</div>}
              </div>

              <div className=" grid grid-cols-3 gap-3 ">
                <label className=" " htmlFor="accountNumber">
                  Account Number:
                </label>
                {isEditBank ? (
                  <input
                    className=" rounded-xl  py-1 px-2"
                    id="accountNumber"
                    name="accountNumber"
                    type="text"
                    onClick={() => setBankErrors({})}
                    onChange={handleBankChange}
                    value={bankFormValues.accountNumber}
                  />
                ) : (
                  <div>{bankFormValues.accountNumber}</div>
                )}
                {bankErrors.accountNumber && (
                  <div>{bankErrors.accountNumber}</div>
                )}
              </div>

              <div className=" grid grid-cols-3 gap-3 ">
                <label className=" " htmlFor="ifscCode">
                  IFSC Code:
                </label>
                {isEditBank ? (
                  <input
                    className=" rounded-xl  py-1 px-2"
                    id="ifscCode"
                    name="ifscCode"
                    type="text"
                    onClick={() => setBankErrors({})}
                    onChange={handleBankChange}
                    value={bankFormValues.ifscCode}
                  />
                ) : (
                  <div>{bankFormValues.ifscCode}</div>
                )}
                {bankErrors.ifscCode && <div>{bankErrors.ifscCode}</div>}
              </div>

              <div className=" grid grid-cols-3 gap-3 ">
                <label className=" " htmlFor="panNumber">
                  PAN Number:
                </label>
                {isEditBank ? (
                  <input
                    className=" rounded-xl  py-1 px-2"
                    id="panNumber"
                    name="panNumber"
                    type="text"
                    onClick={() => setBankErrors({})}
                    onChange={handleBankChange}
                    value={bankFormValues.panNumber}
                  />
                ) : (
                  <div>{bankFormValues.panNumber}</div>
                )}
                {bankErrors.panNumber && <div>{bankErrors.panNumber}</div>}
              </div>

              <div className=" grid grid-cols-3 gap-3 ">
                <label className=" " htmlFor="panCardPdf">
                  PAN Card (Both-sides)(PDF):
                </label>
                {isEditBank ? (
                  <input
                    className=" rounded-xl  py-1 px-2"
                    id="panCardPdf"
                    name="panCardPdf"
                    type="file"
                    accept="application/pdf"
                    onClick={() => setBankErrors({})}
                    onChange={handleBankFileChange}
                  />
                ) : (
                  <button className=" bg-neutral-700 px-4 py-1 rounded-xl col-span-2 w-[20%]">
                    <Link
                      href={bankFormValues.panCardPdf as string}
                      target="_blank"
                    >
                      View
                    </Link>
                  </button>
                )}
                {bankErrors.panCardPdf && <div>{bankErrors.panCardPdf}</div>}
              </div>
            </div>
            <div
              className="mx-autos text-center mt-4 rounded-2xl px-8 py-2 bg-stone-400 cursor-pointer hover:bg-stone-500"
              onClick={handleBankInfoSubmit}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <span>{isEditBank ? 'Submit' : 'Edit'}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
