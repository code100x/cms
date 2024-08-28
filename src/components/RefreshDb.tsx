'use client';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { RefreshCcw } from 'lucide-react';

//@ts-ignore
export function RefreshDb({ refreshDb }) {
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
    <Button className="gap-2 text-lg dark:text-white" onClick={handleClick}>
      <RefreshCcw /> Sync Courses
    </Button>
  );
}
