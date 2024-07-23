import Link from "next/link";
import { createClient } from "../_utils/supabase/server";
import CurrentUserBadge from "./CurrentUserBadge";
import Navigation from "./Navigation";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import SignOutButton from "./SignoutButton";

const Sidebar = async () => {
  const { data: session } = await createClient().auth.getUser();

  return (
    <div className="flex flex-col justify-between rounded-sm bg-white pt-4">
      <div className="mx-auto">
        <Logo />
      </div>
      <div className="z-10 hidden flex-1 justify-between  pb-10 transition-all lg:flex lg:flex-col">
        <Navigation />

        {session?.user ? (
          <div className="flex items-center gap-2 pl-3">
            {/* <CurrentUserBadge /> */}

            <SignOutButton />
            <span className="text-base">Logout</span>
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

      <div className="relative z-20 block lg:hidden">
        <MobileNavigation session={session}>
          <CurrentUserBadge />
        </MobileNavigation>
      </div>
    </div>
  );
};

export default Sidebar;
