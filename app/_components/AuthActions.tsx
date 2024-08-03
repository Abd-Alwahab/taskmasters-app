'use client'

import Link from 'next/link'
import SignOutButton from './SignoutButton'
import { useAuth } from '../_context/auth'

function AuthActions() {
  const { currentUser } = useAuth()
  return (
    <>
      {' '}
      {currentUser ? (
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
    </>
  )
}

export default AuthActions
