'use client';
import { logoutUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

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
    <div className="mx-auto flex w-full flex-col gap-8 rounded-2xl bg-primary/5 p-8 md:max-w-[45vw]">
      <h1 className="flex items-center gap-4 text-2xl font-bold text-primary lg:text-3xl">
        <LogOut className="size-6" /> Logout User
      </h1>
      <form
        onSubmit={handlLogout}
        ref={formRef}
        className="flex flex-col gap-4"
      >
        <label className="sr-only">Email</label>
        <Input
          className="h-14 w-full px-4 focus:outline-none focus:ring-0 active:ring-0"
          id="email"
          name="email"
          placeholder="User Email"
        />
        <label className="sr-only">Admin password</label>
        <Input
          className="h-14 w-full px-4 focus:outline-none focus:ring-0 active:ring-0"
          id="adminPassword"
          name="adminPassword"
          placeholder="Admin Password"
        />
        <p className="font-medium text-primary/80">
          Are you sure you want to logout this user?
        </p>
        <Button className="w-fit" type="submit" variant="destructive">
          Logout
        </Button>
      </form>
    </div>
  );
};

export default LogoutUserComp;
