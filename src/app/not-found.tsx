import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-primary md:text-6xl">
          404 - Page Not Found
        </h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        {/* Simplified approach to avoid hydration issues */}
        <Link 
          href="/"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground dark:text-neutral-950 hover:bg-primary/90 h-11 rounded-md px-8"
        >
          Go Back Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
