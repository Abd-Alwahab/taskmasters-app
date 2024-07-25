import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/_utils/supabase/midddleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/account', '/planner'],
}
