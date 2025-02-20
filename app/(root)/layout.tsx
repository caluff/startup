import React from 'react'
import { Navbar } from '@/components/navigation/navbar'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={'font-work-sans'}>
      <Navbar />
      {children}
    </main>
  )
}
