'use client';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import { RefreshCw } from 'lucide-react';

//@ts-ignore
export function RefreshDb({ refreshDb, expand }) {
  const session = useSession();

  const handleClick = async () => {
    // @ts-ignore
    const res = await refreshDb({ userId: session.data.user.id });
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.info(res.message);
    }
  };

  // if (session.status === 'loading') return <>Loading...</>;

  return (
    <div className="mx-auto mb-2">
      {expand ? (
        <div className="flex flex-col justify-center gap-2">
          <h1>Don't see all your courses?</h1>
          <Button className="dark:text-white" onClick={handleClick}>
            Refresh Database
          </Button>
        </div>
      ) : (
        <div>
          <Button className="dark:text-white" onClick={handleClick}>
            <RefreshCw />
          </Button>
        </div>
      )}
    </div>
  );
}
