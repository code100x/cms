'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
//import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';

export const AppbarAuth = ({ isInMenu = false }: { isInMenu?: boolean }) => {
  const session = useSession();
  //const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const auth = () => {
    setLoading(true);
    if (session.data?.user) {
      signOut();
    } else {
      signIn();
    }
    setLoading(false);
  };

  return (
    <Button
      loading={loading}
      size={'sm'}
      variant={isInMenu ? 'navLink' : 'outline'}
      id="navbar-default"
      onClick={auth}
    >
      {session.data?.user ? 'Logout' : 'Login'}
    </Button>
  );
};
