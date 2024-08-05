import { Suspense } from 'react'
import CategoryListContainer from '../_features/categories/CategoryListContainer'

async function Categories() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryListContainer />
    </Suspense>
  )
}

export default Categories
