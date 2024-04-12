'use client';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

//@ts-ignore
export function RefreshDb({ refreshDb }) {
  const session = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const res = await refreshDb({ userId: session.data.user.id });
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.info(res.message);
      }
    } catch (error) {
      toast.error('An error occurred while refreshing the database.');
    }
    setLoading(false);
  };

  if (session.status === 'loading')
    return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-col gap-2 mx-auto">
      <h1>Don't see all your courses?</h1>
      <Button
        loading={loading}
        className="dark:text-white"
        onClick={handleClick}
      >
        Refresh Database
      </Button>
    </div>
  );
}
