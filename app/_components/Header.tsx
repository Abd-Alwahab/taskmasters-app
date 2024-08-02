import { createClient } from '../_utils/supabase/server'
import CurrentUserBadge from './CurrentUserBadge'

async function Header() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null
  return (
    <header className="mb-4 flex justify-end rounded-lg bg-white px-6 py-4">
      <CurrentUserBadge />
    </header>
  )
}

export default Header
