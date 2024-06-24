'use client';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function RefreshDb({
  refreshDb,
}: {
  refreshDb: () => Promise<{ error: boolean; message: string }>;
}) {
  const handleClick = async () => {
    const res = await refreshDb();
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.info(res.message);
    }
  };

  return (
    <div className="mx-auto flex flex-col gap-2">
      <h1>Don't see all your courses?</h1>
      <Button className="dark:text-white" onClick={handleClick}>
        Refresh Database
      </Button>
    </div>
  );
}
