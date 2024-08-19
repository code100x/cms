'use client';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { RefreshCw } from 'lucide-react';
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
    <button
      className="flex h-10 items-center gap-2 rounded-lg border p-2 text-base text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-900"
      onClick={() => handleClick()}
    >
      <RefreshCw />
      Sync Courses
    </button>
  );
}
