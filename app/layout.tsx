import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'

const sourceSans3 = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

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
        className={`${sourceSans3.className} grid h-screen w-screen grid-cols-[15rem_1fr] gap-2 overflow-hidden bg-gray-100 p-3`}
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
