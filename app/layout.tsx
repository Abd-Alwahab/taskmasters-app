import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import AppAuthProvider from './_lib/AppAuthProvider'
import dynamic from 'next/dynamic'
import './globals.css'
const Header = dynamic(() => import('./_components/Header'))
const MobileNavigation = dynamic(() => import('./_components/MobileNavigation'))

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
        className={`${sourceSans3.className}flex  h-screen w-screen gap-4 bg-white px-2 lg:grid lg:grid-cols-[15rem_1fr] lg:overflow-hidden lg:bg-gray-100 lg:p-3`}
      >
        <AppAuthProvider>
          <div className="hidden h-full lg:block">
            <Sidebar />
          </div>

          <div className="grid size-full grid-rows-[72px_1fr] flex-col gap-4 lg:flex lg:gap-0 lg:overflow-hidden">
            <div className="hidden lg:block">
              <Header />
            </div>

            <div className="relative z-20 block lg:hidden">
              <MobileNavigation />
            </div>

            <main className="h-full flex-1">{children}</main>
          </div>
        </AppAuthProvider>
      </body>
    </html>
  )
}
