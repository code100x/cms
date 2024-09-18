'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export const AppbarAuth = () => {
  const session = useSession();
  const router = useRouter();

  return (
    !session?.data?.user && (
      <Button
        onClick={() => {
          router.push('/signin');
        }}
      >
        Login
      </Button>
    )
  );
};
