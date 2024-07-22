import Link from "next/link";
import { auth } from "../_lib/auth";
import SignOutButton from "./SignoutButton";
import CurrentUserBadge from "./CurrentUserBadge";

async function HeaderNavigation() {
  const session = await auth();
  return (
    <div className="ml-auto flex max-w-[60%] items-center justify-between gap-8 py-6">
      <nav>
        <ul className="flex gap-8">
          <li>
            <Link className="text-sm" href="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="text-sm" href="/about">
              About
            </Link>
          </li>

          <li>
            <Link className="text-sm" href="/developer">
              Developer
            </Link>
          </li>
        </ul>
      </nav>

      {session?.user ? (
        <div className="flex items-center gap-5">
          <CurrentUserBadge />

          <SignOutButton />
        </div>
      ) : (
        <Link
          href="/login"
          className="group rounded-full border border-quill-gray-950 px-4 py-2 transition-all hover:bg-quill-gray-950"
        >
          <span className="text-sm text-quill-gray-950 transition-all group-hover:text-white">
            Login / Signup
          </span>
        </Link>
      )}
    </div>
  );
}

export default HeaderNavigation;
