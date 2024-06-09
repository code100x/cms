'use client';

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
//import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/shad/button';

export const AppbarAuth = ({ isInMenu = false }: { isInMenu?: boolean }) => {
  const session = useSession();
  //const router = useRouter();

  return (
    !session?.data?.user && (
      <Button
        size={'sm'}
        variant={isInMenu ? 'navLink' : 'outline'}
        id="navbar-default"
        onClick={() => {
          signIn();
        }}
      >
        Login
      </Button>
    )
  );
};
