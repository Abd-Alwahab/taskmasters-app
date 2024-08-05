import { Suspense } from 'react'
import CategoryListContainer from '../_features/categories/CategoryListContainer'
import CategorySkeletonLoader from '../_features/categories/CategoryListSkeletonLoader'

async function Categories() {
  return (
    <Suspense fallback={<CategorySkeletonLoader />}>
      <CategoryListContainer />
    </Suspense>
  )
}

export default Categories
