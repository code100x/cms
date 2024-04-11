import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[90vh]">
      <div className="">
        <h1 className="bg-clip-text bg-gradient-to-b from-gray-600 to-[#020817] inline-block text-transparent text-9xl font-semibold">
          404
        </h1>
      </div>
      <h2 className="text-zinc-500 text-xl font-semibold capitalize">
        oops.... Page not found
      </h2>
      <Link href={'/'}>
        <button className="outline-none rounded-3xl bg-primary hover:bg-primary-foreground border hover:border-primary hover:transition-all hover:duration-200 px-5 py-3 flex gap-2 items-center ">
          <span>Go to Homepage</span>
          <Home size={18} />
        </button>
      </Link>
    </div>
  );
}
