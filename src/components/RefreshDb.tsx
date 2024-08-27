'use client';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { RefreshCw } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { sidebarOpen } from '@/store/atoms/sidebar';

//@ts-ignore
export function RefreshDb({ refreshDb }) {
  const expanded = useRecoilValue(sidebarOpen);
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
    <div className="mx-auto flex flex-col gap-2">
      {expanded && <h1>Don't see all your courses?</h1>}
      <Button className="dark:text-white" onClick={handleClick}>
        {expanded ? 'Refresh Database' : <RefreshCw />}
      </Button>
    </div>
  );
}
