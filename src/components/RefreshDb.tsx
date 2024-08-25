'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { RefreshCcw } from 'lucide-react';

//@ts-ignore
export function RefreshDb({ refreshDb }) {
  const session = useSession();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    setIsAnimating(true); // Start animation

    // @ts-ignore
    const res = await refreshDb({ userId: session.data.user.id });

    if (res.error) {
      toast.error(res.message);
    } else {
      toast.info(res.message);
    }

    // Stop animation after a delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (session.status === 'loading') return <>Loading...</>;

  return (
    <div className="mx-auto flex gap-2">
      <RefreshCcw className={`mr-1 ${isAnimating ? 'animate-spin' : ''}`} />
      <button
        className={`dark:text-white ${isAnimating ? 'animate-pulse' : ''}`}
        onClick={handleClick}
      >
        Refresh DB
      </button>
    </div>
  );
}
