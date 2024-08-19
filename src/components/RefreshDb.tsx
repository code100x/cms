'use client';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

//@ts-ignore
export function RefreshDb({ refreshDb }) {
  const session = useSession();
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async () => {
    setIsFetching(true);
    // @ts-ignore
    const res = await refreshDb({ userId: session.data.user.id });
    if (res.error) {
      setIsFetching(false);
      toast.error(res.message);
    } else {
      setIsFetching(false);
      toast.info(res.message);
    }
  };

  if (session.status === 'loading') return <RefreshCwIcon className='animate-spin' size={18} />;

  return (
    <div className="flex flex-col gap-2">
      {/* <h1>Don't see all your courses?</h1> */}
      <Button variant='outline' className="dark:text-white flex rounded-md items-center justify-center gap-2 bg-transparent" onClick={handleClick}>
        <RefreshCwIcon className={`${isFetching ? 'animate-spin' : ''}`} size={18} />
        <p>Sync Courses</p>
      </Button>
    </div>
  );
}
