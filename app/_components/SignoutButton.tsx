'use client'

import { LuLogOut } from 'react-icons/lu'
import { logoutAction } from '../_lib/actions'

function SignOutButton() {
  return (
    <button onClick={() => logoutAction()} className="flex items-center gap-2">
      <LuLogOut className="text-xl" />
      <span className="text-base">Logout</span>
    </button>
  )
}

export default SignOutButton
