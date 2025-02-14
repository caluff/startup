import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import 'easymde/dist/easymde.min.css'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import localFont from 'next/font/local'
import React from 'react'
import './globals.css'

const workSans = localFont({
  src: [
    {
      path: './fonts/WorkSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Thin.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-ExtraLight.ttf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: 'Howcase Startups',
  description: 'Pitch, Vote and Grow',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <ClerkProvider>
        <html lang="en">
          <body className={workSans.variable}>
            {children}
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </ViewTransitions>
  )
}
