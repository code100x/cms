'use client';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import ModalsProvider from '@/components/ModalsProvider';
import DrawerProvider from '@/components/DrawerProvider';
import { ReactQueryProvider } from '@/components/React-query-provider';
import { Toaster } from 'react-hot-toast';
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilRoot>
            <ModalsProvider />
            <DrawerProvider />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </RecoilRoot>
        </ThemeProvider>
      </SessionProvider>
    </ReactQueryProvider>
  );
};
