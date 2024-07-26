/* eslint-disable @next/next/no-img-element */
import { createClient } from '../_utils/supabase/server'

async function CurrentUserBadge() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null
  return (
    <div className="flex items-center justify-center gap-2 transition-colors">
      <img
        src={user?.user_metadata?.picture ?? ''}
        alt="user image"
        className="size-8 rounded-full"
        referrerPolicy="no-referrer"
        width={32}
        height={32}
      />
      <span className="text-lg">{user?.user_metadata?.name}</span>
    </div>
  )
}

export default CurrentUserBadge
