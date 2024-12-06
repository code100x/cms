'use client';

import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const page = () => {
  useEffect(() => {
    (async () => {
      toast('Too many devices connected. Logging out!', {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await signOut({
        callbackUrl: '/signin',
      });
    })();
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default page;
