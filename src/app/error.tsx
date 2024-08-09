'use client';

import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  // reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              There was a error loading the site
            </h3>
          </div>
        </div>
      </div>
      <div className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center gap-y-6 px-4">
        <h2 className="text-3xl font-bold">Something went wrong!</h2>
        <h2 className="text-xl font-bold">
          Alternatively You can view content on!
        </h2>
        <Link
          href="https://harkirat.classx.co.in/purchases"
          className="text-white underline underline-offset-2"
        >
          https://harkirat.classx.co.in/purchases
        </Link>
      </div>
    </>
  );
}
