import './globals.css';

import { Appbar } from '@/components/Appbar';
import { Inter as FontSans } from 'next/font/google';
import Footer from '@/components/landing/footer/footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { HomeSidebar } from '@/components/home-sidebar/HomeSidebar';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Providers } from './providers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site-config';

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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <GoogleAnalytics />
        <Providers>
          <div className="flex w-full overflow-hidden">
            <HomeSidebar />

            <div className="flex w-full flex-col">
              <Appbar />
              <NextTopLoader color="#2E78C7" height={2} />
              {/* this is done as to keep footer in the bottom of the page */}
              <div className="flex h-[calc(100vh-64px)] flex-col justify-between overflow-auto">
                <div className="w-full">{children}</div>
                <Footer />
              </div>
            </div>
          </div>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
