'use server'

import { headers } from 'next/headers'
import { createClient } from '../_utils/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAction() {
  const origin = headers().get('origin')

  const { data, error } = await createClient().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return redirect(data?.url)
}

export async function logoutAction() {
  await createClient().auth.signOut()
}
