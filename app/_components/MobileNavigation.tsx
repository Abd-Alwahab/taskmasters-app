'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi' // Hamburger icon
import { AiOutlineClose } from 'react-icons/ai' // Close icon
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import SignOutButton from './SignoutButton'
import { useAuth } from '../context/auth'
import { FaTasks } from 'react-icons/fa'
import { GoInfo } from 'react-icons/go'
import { IoMdHome } from 'react-icons/io'
import { TbCategory } from 'react-icons/tb'
import { RiLoginBoxLine } from 'react-icons/ri'

type Props = {
  children: ReactNode
}
function MobileNavigation({ children }: Props) {
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

        <div
          className={`fixed left-0 top-0 z-10 mt-2 flex h-screen w-screen justify-center gap-11 space-y-1 bg-white  transition-all ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
          <ul className="mx-auto flex w-fit flex-col justify-center gap-5 ">
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
                <span className={`${pathname === '/' ? 'text-amber-500' : ''}`}>
                  Home
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={`flex w-full items-center justify-start gap-3 font-medium ${pathname === '/planner' ? 'border-b-4 border-amber-400 ' : ''} py-3 pl-3 text-base`}
                href="/planner"
              >
                <FaTasks
                  fontSize={20}
                  className={`${pathname === '/planner' ? 'text-amber-500' : ''}`}
                />
                <span
                  className={`${pathname === '/planner' ? 'text-amber-500' : ''}`}
                >
                  Planner
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
                <div className="flex flex-col items-center gap-6">
                  {children}

                  <SignOutButton />
                </div>
              ) : (
                <Link
                  className={`flex w-full items-center justify-start gap-3 font-medium ${pathname === '/login' ? 'border-b-4 border-amber-400 ' : ''} py-3 pl-3 text-base`}
                  href="/about"
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
