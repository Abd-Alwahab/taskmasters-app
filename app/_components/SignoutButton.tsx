'use client'

import { LuLogOut } from 'react-icons/lu'
import { logoutAction } from '../_lib/actions'

function SignOutButton() {
  return (
    <button
      onClick={() => logoutAction()}
      className="flex items-center gap-2 pl-3 text-white"
    >
      <LuLogOut className="text-3xl lg:text-xl" />
      <span className="text-base">Logout</span>
    </button>
  )
}

export default SignOutButton
