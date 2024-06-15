'use client';
import React, { useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../ErrorMessage';
import { ResetPasswordType } from '@/actions/auth/types';
import { ResetPasswordSchema } from '@/actions/auth/schema';
import { toast } from 'sonner';
import { ResetPasswordHandler } from '@/actions/auth';
import { Loader } from '../Loader';

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit: SubmitHandler<ResetPasswordType> = async (
    data: ResetPasswordType,
  ) => {
    startTransition(async () => {
      try {
        const response = await ResetPasswordHandler(data);
        if (response?.success) {
          toast.success(response?.message);
        } else if (response?.error) {
          console.log(response?.error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <form
      className="flex h-screen items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="mx-auto w-[70%] md:w-[70%] lg:w-[30%]">
        <CardHeader>
          <CardTitle>Email verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@email.com"
                {...register('email', { required: true })}
                disabled={isPending}
              />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </div>
          </div>
          <Button className="my-3 w-full" disabled={isPending}>
            {isPending ? (
              <Loader />
            ) : (
              <p className="text-white hover:text-gray-200">
                Send Email Verification
              </p>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ResetPasswordForm;
