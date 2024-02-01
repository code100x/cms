'use client';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const AppbarAuth = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 p-4">
        <li>
          <div
            onClick={() => {
              if (session.data?.user) {
                signOut();
              } else {
                router.push('/api/auth/signin');
              }
            }}
            className="cursor-pointer p-2 "
          >
            {session.data?.user ? 'Logout' : 'Sign in'}
          </div>
        </li>
      </ul>
    </div>
  );
};
