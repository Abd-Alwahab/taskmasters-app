import { createClient } from '../_utils/supabase/server'
import { AuthProvider } from '../context/auth'
import { ReactNode } from 'react'

async function AppAuthProvider({ children }: { children: ReactNode }) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  return <AuthProvider currentUser={user}>{children}</AuthProvider>
}

export default AppAuthProvider
