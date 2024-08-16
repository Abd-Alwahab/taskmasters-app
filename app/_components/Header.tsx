import Link from 'next/link'
import { createClient } from '../_utils/supabase/server'
import CurrentUserBadge from './CurrentUserBadge'
import { FcFeedback } from 'react-icons/fc'

async function Header() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null
  return (
    <header className="mb-2.5 flex justify-between rounded-lg bg-white px-6 py-4">
      <Link
        href="/feedbacks"
        className="flex items-center gap-2 rounded-lg bg-gray-100 p-2"
      >
        <FcFeedback fontSize={24} />
        <span>Feedbacks</span>
      </Link>
      <CurrentUserBadge />
    </header>
  )
}

export default Header
