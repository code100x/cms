'use client';
import { Button } from '@repo/ui/shad/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

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
    <div className="flex flex-col gap-2 mx-auto">
      <h1>Don't see all your courses?</h1>
      <Button className="dark:text-white" onClick={handleClick}>
        Refresh Database
      </Button>
    </div>
  );
}
