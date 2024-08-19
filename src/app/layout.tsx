import { ReactNode } from 'react';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { siteConfig } from '@/config/site-config';
import MainProvider from './MainProvider';
import { Providers } from './providers';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          '!h-screen !max-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <GoogleAnalytics />
        <Providers>
          {/* <Appbar /> */}
          <NextTopLoader color="#2E78C7" height={2} />
          <MainProvider>
            {children}
          </MainProvider>
          {/* <Footer /> */}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
