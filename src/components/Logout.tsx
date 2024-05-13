'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export const Logout = () => {
  return (
    <Button
      size={'sm'}
      variant={'secondary'}
      id="navbar-default"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
};
