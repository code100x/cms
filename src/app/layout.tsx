import { ReactNode } from 'react';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import { Appbar } from '@/components/Appbar';
import { Providers } from './providers';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { siteConfig } from '@/config/site-config';
import Footer from '@/components/landing/footer/footer';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

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
          <Appbar />
          <NextTopLoader color="#2E78C7" height={2} showSpinner={false} />
          {/* this is done as to keep footer in the bottom of the page */}
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
          <Footer />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
