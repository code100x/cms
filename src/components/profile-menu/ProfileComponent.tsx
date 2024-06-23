'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateCredentialsType } from '@/actions/auth/types';
import { UpdateCredentials } from '@/actions/auth';
import { toast } from 'sonner';
import TwoFactorEnabledButton from '../TwoFactorEnabledButton';

const ProfileComponent = () => {
  const { data: session } = useSession();
  const [enableTwoFactorAuth, setenableTwoFactorAuth] = useState(false);
  const { register, handleSubmit, setValue } = useForm<UpdateCredentialsType>({
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      newPassword: undefined,
      currentPassword: undefined,
      twoFactorEnabled: enableTwoFactorAuth,
    },
  });
  const handleTwoFactorAuth = () => {
    const prev = enableTwoFactorAuth;
    setenableTwoFactorAuth((p) => !p);
    setValue('twoFactorEnabled', !prev);
  };
  const onSubmit: SubmitHandler<UpdateCredentialsType> = async (
    data: UpdateCredentialsType,
  ) => {
    console.log(' data : ', data);
    try {
      const res = await UpdateCredentials(data);
      if (res.success) {
        toast.success(res.message);
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="mx-auto w-[70%] md:w-[70%] lg:w-[30%]">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full items-center gap-4"
          >
            <>
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">Name</Label>
                <Input id="name" type="text" {...register('name')} />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  {...register('email')}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="*****"
                  {...register('currentPassword')}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="email">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="******"
                  {...register('newPassword')}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="email">Two Factor Enabled</Label>
                <TwoFactorEnabledButton
                  onClick={handleTwoFactorAuth}
                  twoFactorEnabled={enableTwoFactorAuth}
                />
              </div>
            </>
            <Button className="my-3 w-full">Update</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfileComponent;
