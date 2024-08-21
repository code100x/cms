import { ReactNode } from 'react';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { siteConfig } from '@/config/site-config';
import { Toaster } from 'sonner';
import { DashboardLayout } from '@/components/DashboardLayout';
import NextTopLoader from 'nextjs-toploader';
import { Appbar } from '@/components/Appbar';

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
          <DashboardLayout>
            <Appbar />
            <NextTopLoader color="#2E78C7" height={2} />
            {/* this is done as to keep footer in the bottom of the page */}
            <div className="min-h-[calc(100vh-64px)] space-y-6 bg-background p-3">
              {children}
            </div>
            {/* <Footer /> */}
          </DashboardLayout>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
