'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaTasks } from 'react-icons/fa'
import { GoInfo } from 'react-icons/go'
import { IoMdHome } from 'react-icons/io'
import { TbCategory } from 'react-icons/tb'
import { useAuth } from '../_context/auth'
import { MdAnalytics } from 'react-icons/md'

function Navigation() {
  const pathname = usePathname()

  const { currentUser } = useAuth()

  return (
    <div className="flex flex-col py-6">
      <nav>
        <ul className="flex flex-col gap-5">
          {currentUser ? (
            <li>
              <Link
                className={`flex w-full items-center gap-3 font-medium ${pathname === '/dashboard' ? 'border-r-4 border-solid border-amber-400 bg-gradient-to-r from-amber-50 to-amber-200' : ''} py-3 pl-3 text-base`}
                href="/dashboard"
              >
                <MdAnalytics
                  fontSize={20}
                  className={`${pathname === '/dashboard' ? 'text-amber-500' : ''}`}
                />
                <span
                  className={`${pathname === '/dashboard' ? 'text-amber-500' : ''}`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
          ) : (
            <li>
              <Link
                className={`flex w-full items-center gap-3 font-medium ${pathname === '/' ? 'border-r-4 border-solid border-amber-400 bg-gradient-to-r from-amber-50 to-amber-200' : ''} py-3 pl-3 text-base`}
                href="/"
              >
                <IoMdHome
                  fontSize={20}
                  className={`${pathname === '/' ? 'text-amber-500' : ''}`}
                />
                <span className={`${pathname === '/' ? 'text-amber-500' : ''}`}>
                  Home
                </span>
              </Link>
            </li>
          )}

          {currentUser ? (
            <>
              {' '}
              <li>
                <Link
                  className={`flex w-full items-center gap-3 font-medium ${pathname === '/tasks' ? 'border-r-4 border-amber-400 bg-gradient-to-r from-amber-50 to-amber-200' : ''} py-3 pl-3 text-base`}
                  href="/tasks"
                >
                  <FaTasks
                    fontSize={20}
                    className={`${pathname === '/tasks' ? 'text-amber-500' : ''}`}
                  />
                  <span
                    className={`${pathname === '/tasks' ? 'text-amber-500' : ''}`}
                  >
                    Tasks
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex w-full items-center gap-3 font-medium ${pathname === '/categories' ? 'border-r-4 border-amber-400 bg-gradient-to-r from-amber-50 to-amber-200' : ''} py-3 pl-3 text-base`}
                  href="/categories"
                >
                  <TbCategory
                    fontSize={20}
                    className={`${pathname === '/categories' ? 'text-amber-500' : ''}`}
                  />
                  <span
                    className={`${pathname === '/categories' ? 'text-amber-500' : ''}`}
                  >
                    Categories
                  </span>
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <Link
              className={`flex w-full items-center gap-3 font-medium ${pathname === '/about' ? 'border-r-4 border-amber-400 bg-gradient-to-r from-amber-50 to-amber-200' : ''} py-3 pl-3 text-base`}
              href="/about"
            >
              <GoInfo
                fontSize={20}
                className={`${pathname === '/about' ? 'text-amber-500' : ''}`}
              />

              <span
                className={`${pathname === '/about' ? 'text-amber-500' : ''}`}
              >
                About
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
