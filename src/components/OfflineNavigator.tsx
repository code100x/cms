'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const OfflineNotification = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOffline(!window.navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!mounted) return null;

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-white dark:bg-[#020817]">
      <div className="flex flex-col items-center space-y-4 rounded-lg p-6">
        <Image
          src="/harkirat.png"
          alt="Offline"
          width={48}
          height={48}
          unoptimized
          className="mb-2"
        />
        <h2 className="text-xl font-semibold text-black dark:text-white">
          You are offline
        </h2>
        <p className="text-center text-neutral-500 dark:text-neutral-200">
          Please check your internet connection
        </p>
      </div>
    </div>
  );
};

export default OfflineNotification;
