import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Planner - Organize Your Day & Boost Productivity',
  description:
    'Simplify your life with our easy-to-use task planner. Manage to-do lists, set reminders, and achieve your goals.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans3.className} grid h-screen w-screen grid-cols-[18rem_1fr] gap-3 overflow-hidden bg-white p-4`}
      >
        <Sidebar />

        <div className="flex size-full flex-col gap-4 overflow-hidden">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
