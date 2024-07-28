import { cache, ReactNode } from 'react'
import { getCategories } from '../_services/categoriesService'
import { CategoriesProvider } from '../context/categories'

async function PlannerLayout({ children }: { children: ReactNode }) {
  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()
  return (
    <CategoriesProvider categories={categories ?? []}>
      {children}
    </CategoriesProvider>
  )
}

export default PlannerLayout
