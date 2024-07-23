"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";

function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 py-6">
      <nav>
        <ul className="flex flex-col">
          <li>
            <Link
              className={`flex w-full items-center gap-2 ${pathname === "/" ? "bg-gray-800 text-white" : ""} py-3 pl-3 text-base`}
              href="/"
            >
              <IoMdHome fontSize={20} />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              className={`flex w-full items-center gap-2 ${pathname === "/planner" ? "bg-gray-800 text-white" : ""} py-3 pl-3 text-base`}
              href="/planner"
            >
              <FaTasks fontSize={20} />
              <span>Planner</span>
            </Link>
          </li>

          <li>
            <Link
              className={`flex w-full items-center gap-2 ${pathname === "/about" ? "bg-gray-800 text-white" : ""} py-3 pl-3 text-base`}
              href="/about"
            >
              <FaCircleInfo fontSize={20} />

              <span>About</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
