import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Appbar } from '@/components/Appbar';
import { Providers } from './providers';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { siteConfig } from '@/config/site-config';
import Footer from '@/components/landing/footer/footer';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

const fontSans = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.className} min-h-screen bg-background antialiased`}
      >
        <GoogleAnalytics />
        <Providers>
          <Appbar />
          <NextTopLoader color="#2E78C7" height={2} />
          {/* this is done as to keep footer in the bottom of the page */}
          <div className="min-h-[calc(100vh-80px)]">{children}</div>
          <Footer />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
