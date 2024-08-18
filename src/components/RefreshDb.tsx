'use client';
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

  if (session.status === 'loading') return <>Loading...</>;

  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex items-center gap-2 rounded-sm border px-3 py-1 text-gray-500 dark:text-gray-500"
        onClick={handleClick}
      >
        <RefreshCcw />
        Sync Courses
      </button>
    </div>
  );
}
