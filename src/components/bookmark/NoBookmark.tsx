import { Bookmark } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const NoBookmark = () => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-1 overflow-hidden">
      <Image
        src={`/NoBookmark.svg`}
        alt="No Bookmarks"
        width={40}
        height={40}
        className="size-[40%] min-w-[400px] opacity-90 invert dark:invert-0"
      />
      <h1 className="lg:font-5xl text-center text-2xl font-bold text-black dark:text-white">
        Well.. You have&apos;nt Bookmarked anything yet....
      </h1>
      <p className="text-center text-lg max-sm:text-base sm:w-[400px]">
        💡When you find something you want to save for later, Click the &ldquo;
        <Bookmark className="inline" />
        &rdquo; icon and it will appear here.
      </p>
    </div>
  );
};

export default NoBookmark;
