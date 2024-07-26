import Link from 'next/link'
import { createClient } from '../_utils/supabase/server'
import CurrentUserBadge from './CurrentUserBadge'
import Navigation from './Navigation'
import Logo from './Logo'
import MobileNavigation from './MobileNavigation'
import SignOutButton from './SignoutButton'

const Sidebar = async () => {
  const { data: session } = await createClient().auth.getUser()

  return (
    <div className="flex flex-col justify-between rounded-lg bg-[#011627] pt-4 shadow-lg">
      <div className="mx-auto">
        <Logo />
      </div>
      <div className="z-10 hidden flex-1 justify-between  pb-10 transition-all lg:flex lg:flex-col">
        <Navigation />

        {session?.user ? (
          <div>
            <SignOutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="group mx-4 flex justify-center rounded-full border border-white px-4 py-3 transition-all hover:bg-quill-gray-950"
          >
            <span className="text-sm text-white transition-all group-hover:text-white">
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
  )
}

export default Sidebar
