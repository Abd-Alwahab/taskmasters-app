'use client'

import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi' // Hamburger icon
import { AiOutlineClose } from 'react-icons/ai' // Close icon
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import SignOutButton from './SignoutButton'
import { useAuth } from '../_context/auth'
import { FaTasks } from 'react-icons/fa'
import { GoInfo } from 'react-icons/go'
import { IoMdHome } from 'react-icons/io'
import { TbCategory } from 'react-icons/tb'
import { RiAccountCircleLine, RiLoginBoxLine } from 'react-icons/ri'
import CurrentUserBadge from './CurrentUserBadge'
import { MdOutlineAnalytics } from 'react-icons/md'

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser } = useAuth()

  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="w-fit bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fixed right-0 top-0 z-20 flex w-full items-center justify-between bg-white px-4 py-3 shadow-lg">
          <Logo />

          <div className="flex items-center gap-3">
            <CurrentUserBadge />

            <button
              className=" text-black hover:text-black focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open Mobile Menu"
            >
              {isOpen ? (
                <AiOutlineClose size={24} /> // Close icon when open
              ) : (
                <GiHamburgerMenu size={24} /> // Hamburger icon when closed
              )}
            </button>
          </div>
        </div>

        <div
          className={`fixed left-0 top-0 z-10 flex h-screen w-screen justify-center gap-11 space-y-1 bg-white  transition-all ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
          <ul className="mx-auto flex w-fit flex-col justify-start gap-5 pt-36">
            {currentUser ? (
              <li>
                <Link
                  className={`relative flex w-full items-center justify-start gap-3 font-medium ${pathname === '/' ? 'border-b-4 border-solid border-amber-400 ' : ''} py-3 pl-3 text-base`}
                  href="/dashboard"
                >
                  <div
                    className={`absolute left-0 top-0 ${pathname === '/dashboard' ? 'border-b-4 border-solid border-amber-400 ' : ''}`}
                  />
                  <MdOutlineAnalytics
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
                  className={`relative flex w-full items-center justify-start gap-3 font-medium ${pathname === '/' ? 'border-b-4 border-solid border-amber-400 ' : ''} py-3 pl-3 text-base`}
                  href="/"
                >
                  <div
                    className={`absolute left-0 top-0 ${pathname === '/' ? 'border-b-4 border-solid border-amber-400 ' : ''}`}
                  />
                  <IoMdHome
                    fontSize={20}
                    className={`${pathname === '/' ? 'text-amber-500' : ''}`}
                  />
                  <span
                    className={`${pathname === '/' ? 'text-amber-500' : ''}`}
                  >
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
                    className={`flex w-full items-center justify-start gap-3 font-medium ${pathname === '/tasks' ? 'border-b-4 border-amber-400 ' : ''} py-3 pl-3 text-base`}
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
                    className={`flex w-full items-center justify-start gap-3 font-medium ${pathname === '/categories' ? 'border-b-4 border-amber-400 ' : ''} py-3 pl-3 text-base`}
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
                <li>
                  <Link
                    className={`flex w-full items-center justify-start gap-3 font-medium ${pathname === '/account' ? 'border-b-4 border-amber-400 ' : ''} py-3 pl-3 text-base`}
                    href="/account"
                  >
                    <RiAccountCircleLine
                      fontSize={20}
                      className={`${pathname === '/account' ? 'text-amber-500' : ''}`}
                    />
                    <span
                      className={`${pathname === '/account' ? 'text-amber-500' : ''}`}
                    >
                      Account
                    </span>
                  </Link>
                </li>
              </>
            ) : null}

            <li>
              <Link
                className={`flex w-full items-center justify-start gap-3 font-medium ${pathname === '/about' ? 'border-b-4 border-amber-400 ' : ''} py-3 pl-3 text-base`}
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

            <li>
              {currentUser ? (
                <div className="flex flex-col items-start gap-6 py-3 pl-3">
                  <SignOutButton />
                </div>
              ) : (
                <Link
                  className={`flex w-full items-center justify-start gap-3 font-medium ${pathname === '/login' ? 'border-b-4 border-amber-400 ' : ''} py-3 pl-3 text-base`}
                  href="/login"
                >
                  <RiLoginBoxLine
                    fontSize={20}
                    className={`${pathname === '/login' ? 'text-amber-500' : ''}`}
                  />

                  <span
                    className={`${pathname === '/login' ? 'text-amber-500' : ''}`}
                  >
                    Login
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default MobileNavigation
