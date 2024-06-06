'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function GlobalError() {
  const router = useRouter();
  useEffect(() => {
    // Set the title dynamically
    document.title = '404: Page could not be found';
  }, []);
  const handleClick = () => {
    document.title =
      'Take your development skills from 0 to 100 and join the 100xdevs community';
    router.push('/');
  };
  return (
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <button onClick={handleClick}>
        <div className="mt-2 inline-block rounded bg-blue-500 px-4 py-2 font-semibold dark:text-white hover:bg-blue-600">
          Go back to Home
        </div>
      </button>
    </div>
  );
}
