'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center gap-y-6 px-4">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <h4 className="text-center text-xl text-red-500">{error.message}</h4>

      <h4 className="text-center text-xl text-red-500">
        This is not your problem. We are having some issues please keep patience
        and check discord
      </h4>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
