import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';

export default function ForgetPasswordForm({ setForgetPassword }: Props) {
  const [details, setDetails] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [error, setError] = useState({
    email: false,
    otp: false,
    newPassword: false,
  });

  const sendOTPHandler = async () => {
    setLoading(true);
    const id = toast.loading('Sending otp to registered email');
    try {
      await axios.get('/api/user/change-password', {
        params: {
          email: details.email,
        },
      });
      setOtpSent(true);
      toast.dismiss(id);
      toast.success('OTP sent successfully.');
    } catch (error) {
      toast.dismiss(id);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  const verifyOTPHandler = async () => {
    setLoading(true);
    const id = toast.loading('Verifying OTP');
    try {
      await axios.get('/api/user/change-password/verify-otp', {
        params: {
          email: details.email,
          otp: details.otp,
        },
      });
      setOtpVerified(true);
      toast.dismiss(id);
      toast.success('OTP verified successfully.');
    } catch (error) {
      toast.dismiss(id);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  const changePasswordHandler = async () => {
    setLoading(true);
    const id = toast.loading('Changing password');
    try {
      await axios.post('/api/user/change-password', {
        email: details.email,
        otp: details.otp,
        newPassword: details.newPassword,
      });
      toast.dismiss(id);
      toast.success('Password changed successfully.');
      setForgetPassword(false);
    } catch (error) {
      toast.dismiss(id);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (!otpSent) {
      sendOTPHandler();
    } else if (!otpVerified) {
      verifyOTPHandler();
    } else {
      changePasswordHandler();
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
    setError((prev) => ({
      ...prev,
      [e.target.name]: !e.target.value.trim(),
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid w-full items-center gap-4">
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="email">Registered Email</Label>
          <Input
            autoComplete="off"
            className="focus:ring-none border-none bg-primary/5 focus:outline-none"
            name="email"
            id="email"
            disabled={otpSent}
            placeholder="name@email.com"
            value={details.email}
            onChange={changeHandler}
          />
          {error.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>

        {otpSent && (
          <div className="relative flex flex-col gap-2">
            <Label htmlFor="email">OTP</Label>
            <Input
              autoComplete="off"
              className="focus:ring-none border-none bg-primary/5 focus:outline-none"
              name="otp"
              id="otp"
              disabled={otpSent && otpVerified}
              placeholder="XXXX"
              value={details.otp}
              onChange={changeHandler}
            />
            {error.otp && <span className="text-red-500">OTP is required</span>}
          </div>
        )}
        {otpSent && otpVerified && (
          <div className="relative flex flex-col gap-2">
            <Label htmlFor="email">New Password</Label>
            <div className="flex">
              <Input
                autoComplete="off"
                className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                name="newPassword"
                type={isPasswordVisible ? 'text' : 'password'}
                id="newPassword"
                placeholder="••••••••"
                onChange={changeHandler}
                value={details.newPassword}
              />
              <button
                className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-neutral-500"
                onClick={() => setIsPasswordVisible((p) => !p)}
              >
                {isPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {error.newPassword && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => setForgetPassword(false)}
            className="hover:text-blue-700"
          >
            Login ?
          </button>
        </div>
        <Button
          size={'lg'}
          variant={'branding'}
          disabled={
            !details.email.trim() ||
            loading ||
            (otpSent && !details.otp.trim()) ||
            (otpVerified && !details.newPassword.trim())
          }
          onClick={handleSubmit}
        >
          {!otpSent && 'Send OTP'}
          {otpSent && !otpVerified && 'Verify OTP'}
          {otpSent && otpVerified && 'Update password'}
        </Button>
      </div>
    </div>
  );
}

type Props = {
  setForgetPassword: Dispatch<SetStateAction<boolean>>;
};
