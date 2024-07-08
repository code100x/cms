/**
 * You need to signin via credentials, If not then it will logout
 * Inputbox to write github username (to link with existing userid)
 * -> Prompt to githublogin
 * -> Check DB for linked username
 * -> If fount link the account else show error to try again
 */

'use client';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GithubLogin({
  userId,
  session,
}: {
  session: any;
  userId: string;
}) {
  const router = useRouter();
  const { status } = useSession();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  if (!session) {
    router.push('/signin');
  }

  async function updateGithubData(myData: any) {
    try {
      const res = await axios('/api/github', {
        method: 'PUT',
        data: {
          username: myData.username,
          email: myData.email,
          publicName: myData.publicName,
          image: myData.image,
        },
      });
      const result = await res.data;
      if (result.message === 'successful') {
        setIsSuccessful(true);
        signOut();
      } else {
        setError(result.message);
      }
    } catch (e) {
      setError('Error while linking github account');
    }
  }

  async function handleOnclick() {
    setLoading(true);

    if (session.user.g_username) {
      signOut();
    }

    try {
      const res = await axios('/api/github', {
        method: 'POST',
        data: { value, userId },
      });

      const result = await res.data;
      if (result.message === 'successful') {
        signIn('github');
      } else if (result.message === 'failed') {
        setError('Error while linking github account.');
      }

      setLoading(false);
    } catch (e) {
      setError('Error while updating database. Try again');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === 'authenticated' && session.user.g_username) {
      const myData = {
        username: session.user.g_username,
        email: session.user.g_email,
        publicName: session.user.g_name,
        image: session.user.g_image,
      };

      updateGithubData(myData);
    }
  }, [status, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      {!session.user.g_username && (
        <input
          className="h-[10%] w-[20%] rounded-lg text-center text-3xl"
          type="text"
          value={value}
          placeholder="Github Username"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {!isSuccessful && (
        <>
          <button
            onClick={handleOnclick}
            disabled={isLoading}
            className="rounded-lg bg-blue-400 px-5 py-3 text-3xl"
          >
            {session.user.g_username ? 'SignOut' : 'Connect'}
          </button>

          <div className="text-2xl">
            {session.user.g_username
              ? 'Username Mismatch. Try again.'
              : 'Link your github to your account'}
          </div>
          <div>
            {error && isLoading === false && (
              <div className="rounded-3xl bg-red-500 px-4 py-3">{error}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
