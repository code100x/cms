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
      className="flex rounded-md border-2 p-2"
      onClick={() => handleClick()}
    >
      <RefreshCw className="mr-2" />
      Sync Courses
    </button>
  );
}
