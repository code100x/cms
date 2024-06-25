'use client';
import { SignInSchema } from '@/actions/auth/schema';
import { SignInType } from '@/actions/auth/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ErrorMessage from './ErrorMessage';
import { Loader } from './Loader';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { SignIn } from '@/actions/auth';

const Signin = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showTwoFactorToken, setShowTwoFactorToken] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
  });

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: boolean) => !prevState);
  }
  const handleKeyDown: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (e.key === 'Enter') {
      setIsPasswordVisible(false);
      handleSubmit(onSubmit);
    }
  };
  const [isPending, startTransition] = useTransition();
  const onSubmit: SubmitHandler<SignInType> = async (data: SignInType) => {
    startTransition(async () => {
      try {
        const res = await SignIn(data);
        if (res?.twoFactor) {
          setShowTwoFactorToken(true);
        }
        if (res?.success) {
          const res = await signIn('credentials', {
            redirect: false,
            username: data.email,
            password: data.password,
          });
          if (!res?.error) {
            router.push('/');
            toast.success('Signed In');
          } else {
            toast.error('Oops something went wrong..!');
          }
        }
        if (res?.error) {
          // setErrorMap(res?.error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="mx-auto w-[70%] md:w-[70%] lg:w-[30%]">
        <CardHeader>
          <CardTitle>Signin to your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full items-center gap-4"
          >
            {!showTwoFactorToken ? (
              <>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors?.email && (
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  )}
                </div>
                <div className="relative flex flex-col gap-4">
                  <Label>Password</Label>
                  <div className="flex rounded-lg border">
                    <Input
                      id="password"
                      className="border-0"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>
                {errors?.password && (
                  <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                )}
                <div className="flex justify-end p-1">
                  <Link href={'/auth/reset'}>
                    <p className="cursor-pointer text-sm hover:text-gray-500">
                      Forgot password?
                    </p>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">Two Factor Code</Label>
                <Input
                  id="twoFactorToken"
                  type="text"
                  {...register('twoFactorCode', {
                    required: 'Two Factor code is required',
                  })}
                />
              </div>
            )}
            <Button className="my-3 w-full" disabled={isPending}>
              {isPending ? (
                <Loader />
              ) : (
                <p className="text-white hover:text-gray-200">
                  {showTwoFactorToken ? 'Confirm' : 'Signin'}
                </p>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Signin;
