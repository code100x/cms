import { ReactNode } from 'react';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { siteConfig } from '@/config/site-config';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';
import NextTopLoader from 'nextjs-toploader';

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
          'min-h-screen bg-background font-satoshi antialiased',
          satoshi.variable,
        )}
      >
        <GoogleAnalytics />
        <NextTopLoader />
        <Providers>
          <Navbar />
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
