'use client';
import Link from 'next/link';
export default function GlobalError() {
  return (
    <html>
      <head>
        <title>404: Page could not be found</title>
      </head>
      <body>
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
          <p className="mb-4 text-lg dark:text-white">Oops! Page Not Found.</p>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <Link
            href="/"
            className="mt-2  inline-block rounded bg-blue-500 px-4 py-2 font-semibold dark:text-white hover:bg-blue-600"
          >
            {' '}
            Go back to Home{' '}
          </Link>
        </div>
      </body>
    </html>
  );
}
