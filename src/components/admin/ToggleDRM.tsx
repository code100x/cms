'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

const ToggleDRM = () => {
  const [email, setEmail] = useState('');
  const [adminSecret, setAdminSecret] = useState('');

  const handleSubmit = async (disableDrm: boolean) => {
    const res = await fetch('/api/admin/drm', {
      body: JSON.stringify({
        adminSecret,
        email,
        disableDrm,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status !== 200) {
      const response = await res.json();
      toast.warning(response.msg);
    } else {
      toast.success('DRM toggled successfully');
    }
  };

  return (
    <div>
      <div className="grid w-full grid-rows-5 rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="row-span-3 grid items-center gap-2 p-6">
          <div className="text-3xl font-bold">Toggle DRM</div>
          <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
            Enter the information below to toggle DRM for the user
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
            onChange={(e) => {
              setEmail(e.target.value);
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
            onChange={(e) => {
              setAdminSecret(e.target.value);
            }}
          />
        </div>
        <div className="row-span-2 flex items-center justify-center space-x-2 p-6">
          <Button
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit(false);
            }}
          >
            Enable DRM
          </Button>
          <Button
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit(true);
            }}
          >
            Disable DRM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToggleDRM;
