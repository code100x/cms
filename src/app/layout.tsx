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
          'min-h-screen bg-background font-satoshi antialiased',
          satoshi.variable,
        )}
      >
        <GoogleAnalytics />
        <Providers>
          {/* <NextTopLoader color="#2E78C7" height={2} />
          {/* this is done as to keep footer in the bottom of the page */}
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
          {/* <Footer /> */}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
