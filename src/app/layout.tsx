import { ReactNode } from 'react';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { siteConfig } from '@/config/site-config';
import { Toaster } from 'sonner';

const satoshi = localFont({
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/satoshi.ttf',
    },
  ],
  variable: '--font-satoshi',
});

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-neutral-100 font-satoshi antialiased dark:bg-neutral-950',
          satoshi.variable,
        )}
      >
        <GoogleAnalytics />
        <Providers>
          {/* <NextTopLoader color="#2E78C7" height={2} />
          {/* this is done as to keep footer in the bottom of the page */}
          {children}
          {/* <Footer /> */}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
