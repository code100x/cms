'use client';
import { refreshDb } from '@/actions/refresh-db';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export function RefreshDb() {
  const session = useSession();
  console.log(session);

  const handleClick = async () => {
    // @ts-ignore
    const res = await refreshDb({ userId: session.data.user.id });
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.info(res.message);
    }
  };

  if (session.status === 'loading') return <>Loading...</>;

  return (
    <div className="flex flex-col gap-2">
      <h1>Don't see all your courses?</h1>
      <Button className="dark:text-white" onClick={handleClick}>
        Refresh Database
      </Button>
    </div>
  );
}
