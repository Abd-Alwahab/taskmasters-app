import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/app/_utils/supabase/midddleware'
import { createClient } from './app/_utils/supabase/server'

export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard', '/tasks', '/categories', '/account'] // List of protected routes

  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/login'
  ) {
    // Get the Supabase session from the request cookies
    const {
      data: { user },
    } = await createClient().auth.getUser()

    // If the user is logged in, redirect to '/dashboard'
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    return await updateSession(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/tasks', '/categories', '/login', '/account'],
}
