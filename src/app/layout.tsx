
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import type { Metadata } from 'next'
import './globals.css'
import { Appbar } from '@/components/Appbar'
import { Providers } from './providers'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: '100xdevs cohort',
  description: '100xdevs Cohort by Harkirat Singh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <GoogleAnalytics />
        <Providers>
          <Appbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
