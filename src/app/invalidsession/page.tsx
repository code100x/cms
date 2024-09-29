'use client';

import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const InvalidSessionPage = () => {
  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({
        callbackUrl: '/signin',
      });
      toast('Too many devices connected. Logging out!', {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
    };

    handleSignOut();
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default InvalidSessionPage;
