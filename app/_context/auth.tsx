'use client'

import { User } from '@supabase/supabase-js'
import { createContext, ReactNode, useContext } from 'react'

type AuthContextType = {
  currentUser: User | null
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
})

function AuthProvider({
  children,
  currentUser,
}: {
  children: ReactNode
  currentUser: User | null
}) {
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
