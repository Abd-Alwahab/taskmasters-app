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
  title: {
    template: '%s | Task Masters App',
    default: 'Task Masters | Task Masters App',
  },
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
        className={`${sourceSans3.className} grid h-screen  w-screen grid-cols-[minmax(0,1fr)] gap-4 overflow-hidden bg-white px-2 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:bg-gray-100 lg:p-3`}
      >
        <AppAuthProvider>
          <aside
            aria-label="Main Navigation"
            className="hidden h-full lg:block"
          >
            <Sidebar />
          </aside>

          <div className="grid size-full grid-cols-[minmax(0,1fr)] grid-rows-[72px_1fr] flex-col gap-4 lg:flex lg:gap-0">
            <header className="hidden lg:block">
              <Header />
            </header>

            <nav
              aria-label="Mobile Navigation"
              className="relative z-20 block lg:hidden"
            >
              <MobileNavigation />
            </nav>

            <main className="h-full flex-1" tabIndex={0}>
              {children}
            </main>
          </div>
        </AppAuthProvider>
      </body>
    </html>
  )
}
