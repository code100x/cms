'use client';
import { refreshDb } from '@/actions/refresh-db';
import { RefreshCw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from './ui/button';

//@ts-ignore
export function RefreshDb() {
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

  if (session.status === 'loading') return <>Loading...</>;

  return (
    <Button
      variant={'outline'}
      className="flex items-center gap-2 text-[#64748B] dark:text-[#94A3B8]"
    >
      <RefreshCw size={16} />
      <span className="dark:text-white" onClick={handleClick}>
        Sync Courses
      </span>
    </Button>
  );
}
