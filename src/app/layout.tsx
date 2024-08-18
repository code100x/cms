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
import { HomePageSidebar } from '@/components/HomePageSidebar';

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
          <NextTopLoader color="#2E78C7" height={2} />
          <div className="flex h-[calc(100vh-64px)]">
            <HomePageSidebar />
            <div className="flex flex-1 flex-col overflow-scroll">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
