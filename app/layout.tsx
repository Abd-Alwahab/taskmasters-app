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
        className={`${sourceSans3.className}flex  h-screen w-screen gap-4 bg-white p-3 lg:grid lg:grid-cols-[15rem_1fr] lg:overflow-hidden lg:bg-gray-100`}
      >
        <Sidebar />

        <div className="flex size-full flex-col gap-4 lg:overflow-hidden">
          <Header />
          <main className="flex-1 pt-20 lg:pt-0">{children}</main>
        </div>
      </body>
    </html>
  )
}
