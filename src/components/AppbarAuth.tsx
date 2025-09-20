'use client';

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';

export const AppbarAuth = () => {
  const session = useSession();

  return (
    !session?.data?.user && (
      <Button
        onClick={() => {
          signIn();
        }}
      >
        Login
      </Button>
    )
  );
};
