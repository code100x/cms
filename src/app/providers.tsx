'use client';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
