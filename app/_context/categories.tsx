'use client'

import { Tables } from '@/database.types'
import { createContext, ReactNode, useContext } from 'react'

type CategoriesContextType = {
  categories: Tables<'categories'>[]
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
})

function CategoriesProvider({
  children,
  categories,
}: {
  children: ReactNode
  categories: Tables<'categories'>[]
}) {
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

const useCategories = () => {
  const context = useContext(CategoriesContext)
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider')
  }
  return context
}

export { CategoriesProvider, useCategories }
