import { cache } from 'react'
import { createClient } from './_utils/supabase/server'
import LogoutHomePage from './_features/dashboard/LogoutHomePage'
import LoggedInDashboard from './_features/dashboard/LoggedInDashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Task Masters App',
}

export default async function Home() {
  const supabase = createClient()

  const sessionPromise = cache(async () => await supabase.auth.getSession())
  const {
    data: { session },
  } = await sessionPromise()
  const isLoggedIn = session !== null

  return (
    <div className="flex h-full flex-col gap-6 lg:gap-4">
      {isLoggedIn ? <LoggedInDashboard /> : <LogoutHomePage />}
    </div>
  )
}
