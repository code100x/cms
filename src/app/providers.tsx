'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <RecoilRoot>{children}</RecoilRoot>
      </NextThemesProvider>
    </SessionProvider>
  );
};
