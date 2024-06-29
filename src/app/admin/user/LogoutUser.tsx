'use client';
import { logoutUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { toast } from 'sonner';

const LogoutUserComp = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handlLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const adminPassword = formData.get('adminPassword') as string;
    const res = await logoutUser(email, adminPassword);
    toast.info(res.message || res.error);
  };
  return (
    <form onSubmit={handlLogout} ref={formRef}>
      <div className="grid w-full max-w-sm grid-rows-5 rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="row-span-3 grid items-center gap-2 p-6">
          <div className="text-3xl font-bold">Logout the user</div>
          <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
            Enter the information below to logout the user
          </div>
        </div>

        <div className="row-span-2 flex items-center p-6">
          <Label className="sr-only">EMAIL</Label>
          <Input
            className="w-full"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            style={{
              minWidth: '0',
            }}
          />
        </div>
        <div className="row-span-2 flex items-center p-6">
          <Label className="sr-only">Admin password</Label>
          <Input
            className="w-full"
            id="adminPassword"
            name="adminPassword"
            placeholder="Admin password"
            style={{
              minWidth: '0',
            }}
          />
        </div>
        <div className="row-span-2 flex items-center justify-center p-6">
          <Button className="w-full">Logout</Button>
        </div>
      </div>
    </form>
  );
};

export default LogoutUserComp;
