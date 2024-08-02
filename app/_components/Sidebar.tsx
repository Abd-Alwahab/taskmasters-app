import Link from 'next/link'
import { createClient } from '../_utils/supabase/server'
import Navigation from './Navigation'
import Logo from './Logo'
import SignOutButton from './SignoutButton'

const Sidebar = async () => {
  const { data: session } = await createClient().auth.getUser()

  return (
    <div className="flex h-full flex-col justify-between rounded-lg bg-white pt-4 shadow-lg">
      <div className="relative mx-auto block size-20 pt-2">
        <Logo />
      </div>
      <div className="z-10  flex flex-1  flex-col justify-between gap-6 pb-10 pl-6 transition-all">
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
    </div>
  )
}

export default Sidebar
