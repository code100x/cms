'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import ErrorMessage from '../ErrorMessage';
import { Button } from '../ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewPasswordType } from '@/actions/auth/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchema } from '@/actions/auth/schema';
import { createNewPassword } from '@/actions/auth';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';

const NewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordSchema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const token = useSearchParams().get('token');
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: boolean) => !prevState);
  }
  const onSubmit: SubmitHandler<NewPasswordType> = async (
    value: NewPasswordType,
  ) => {
    if (!token) {
      toast.error('Token Missing');
      return;
    }
    setIsLoading(true);
    try {
      const res = await createNewPassword(token, value);
      if (res?.success) {
        toast.success(res?.message);
      } else if (res?.error) {
        toast.error(res?.error);
        setError(res?.error);
      }
    } catch (e) {
      console.log(e);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex h-screen items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="mx-auto w-[70%] md:w-[70%] lg:w-[30%]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: true })}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
              </button>
              <ErrorMessage>{errors?.password?.message}</ErrorMessage>
            </div>
          </div>
          <Button className="my-3 w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 />
            ) : (
              <p className="text-white hover:text-gray-200">
                Save New Password
              </p>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default NewPasswordForm;
