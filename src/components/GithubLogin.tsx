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
  const [isClicked, setIsClicked] = useState<boolean>(false);
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
    setIsClicked(true);

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

      setIsClicked(false);
    } catch (e) {
      setError('Error while updating database. Try again');
      setIsClicked(false);
    }
  }

  useEffect(() => {
    if (status === 'authenticated' && session.user.g_username) {
      const myData = {
        username: session.user.g_username,
        email: session.user.g_email,
        publicName: session.user.g_name,
      };

      updateGithubData(myData);
    }
  }, [status, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col justify-center gap-10 items-center h-screen">
      {!session.user.g_username && (
        <input
          className=" w-[20%] h-[10%] text-3xl rounded-lg text-center"
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
            disabled={isClicked}
            className=" text-3xl py-3 px-5 bg-blue-400 rounded-lg"
          >
            {session.user.g_username ? 'SignOut' : 'Connect'}
          </button>

          <div className=" text-2xl">
            {session.user.g_username
              ? 'Username Mismatch. Try again.'
              : 'Link your github to your account'}
          </div>
          <div>
            {error && isClicked === false && (
              <div className=" bg-red-500 px-4 py-3 rounded-3xl">{error}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
