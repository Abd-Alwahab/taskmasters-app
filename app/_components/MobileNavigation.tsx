"use client";

import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger icon
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import Link from "next/link";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

type Props = {
  session: Session | null;
};
function MobileNavigation({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="w-fit bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="fixed right-4 top-9 z-20 text-black hover:text-black focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <AiOutlineClose size={24} /> // Close icon when open
            ) : (
              <GiHamburgerMenu size={24} /> // Hamburger icon when closed
            )}
          </button>
        </div>

        <div
          className={` fixed left-0 top-0 z-10 mt-2 flex h-screen w-screen flex-col gap-11 space-y-1 bg-white pt-40  transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <div className="flex justify-center">
            <Logo />
          </div>

          <ul className="flex flex-col items-center justify-center gap-8">
            <li>
              <Link href="/" className="text-2xl transition-colors">
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="hover:text-accent-400 text-2xl transition-colors"
              >
                About
              </Link>
            </li>

            <li>
              <Link href="/developer" className="text-2xl transition-colors">
                Developer
              </Link>
            </li>
            <li>
              {session?.user ? (
                <Link
                  href="/account"
                  className="hover:text-accent-400 flex justify-center gap-4 transition-colors"
                >
                  <img
                    src={session.user.image ?? ""}
                    alt="user image"
                    className="size-8 rounded-full"
                    referrerPolicy="no-referrer"
                    width={32}
                    height={32}
                  />
                  <span className="text-2xl">Guest area</span>
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="hover:text-accent-400 text-2xl transition-colors"
                >
                  <button className="group flex items-center rounded-full border border-quill-gray-950 px-5 py-2 transition-all hover:bg-quill-gray-950">
                    <span className="text-lg text-quill-gray-950 transition-all group-hover:text-white">
                      Login / Signup
                    </span>
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MobileNavigation;
