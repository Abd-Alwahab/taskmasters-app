import { createClient } from '../_utils/supabase/server'
import CurrentUserBadge from './CurrentUserBadge'

async function Header() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null
  return (
    <header className="flex justify-end rounded-lg bg-[#FBB13C] px-6 py-4">
      <CurrentUserBadge />
    </header>
  )
}

export default Header
