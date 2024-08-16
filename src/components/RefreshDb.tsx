'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { RefreshCwIcon } from 'lucide-react';

// @ts-ignore
export function RefreshDb({ refreshDb }) {
  const session = useSession();
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = async () => {
    setIsRotating(true);
    // @ts-ignore
    const res = await refreshDb({ userId: session.data.user.id });
    if (res.error) {
      toast.error(res.message);
      setIsRotating(false);
    } else {
      toast.info(res.message);
      setTimeout(() => setIsRotating(false), 1000);
    }
  };

  if (session.status === 'loading') return <>Loading...</>;

  return (
    <Button
      className="dark:text-white"
      variant={'outline'}
      onClick={handleClick}
    >
      <RefreshCwIcon
        className={`mr-2 h-5 ${isRotating ? 'animate-spin delay-0' : ''}`}
      />
      Sync Courses
    </Button>
  );
}
