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
    <div className="flex flex-col justify-between rounded-lg bg-white lg:pt-4 lg:shadow-lg">
      <div className="fixed top-0 z-20 size-14 h-16 w-full bg-white pt-2 lg:relative lg:mx-auto lg:size-20">
        <Logo />
      </div>
      <div className="z-10 hidden flex-1 justify-between  gap-6 pb-10 pl-6 transition-all lg:flex lg:flex-col">
        <Navigation />

        {session?.user ? (
          <div>
            <SignOutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="group flex w-4/5 justify-center rounded-full border border-gray-600 px-4 py-3 transition-all hover:bg-quill-gray-950"
          >
            <span className="text-sm transition-all group-hover:text-white">
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
