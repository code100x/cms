'use client';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { toast } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.addEventListener('offline', () => toast.loading('You are offline'));
    window.addEventListener('online', () => toast.dismiss());
  }, []);
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <RecoilRoot>{children}</RecoilRoot>
      </ThemeProvider>
    </SessionProvider>
  );
};
