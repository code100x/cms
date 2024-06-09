'use client';

import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';
import { Toaster } from '@repo/ui/shad/sonner';
import { toast } from 'sonner';

const page = () => {
  useEffect(() => {
    signOut({
      callbackUrl: '/signin',
    });
    toast('Too many devices connected. Logging out!', {
      action: {
        label: 'Close',
        onClick: () => toast.dismiss(),
      },
    });
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default page;
