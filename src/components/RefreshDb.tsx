'use client';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { FaSync } from 'react-icons/fa';

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

  if (session.status === 'loading') return <>Loading...</>;

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="gap-2 dark:text-white"
        onClick={handleClick}
      >
        <FaSync /> Sync Courses
      </Button>
    </div>
  );
}
