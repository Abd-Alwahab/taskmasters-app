'use client'

/* eslint-disable @next/next/no-img-element */
import { useAuth } from '../_context/auth'

function CurrentUserBadge() {
  const { currentUser } = useAuth()

  if (!currentUser) return null
  return (
    <div className="flex items-center justify-center gap-2 transition-colors">
      <img
        src={currentUser?.user_metadata?.picture ?? ''}
        alt="user image"
        className="size-8 rounded-full"
        referrerPolicy="no-referrer"
        width={32}
        height={32}
      />
      <span className="hidden text-lg lg:block">
        {currentUser?.user_metadata?.name}
      </span>
    </div>
  )
}

export default CurrentUserBadge
