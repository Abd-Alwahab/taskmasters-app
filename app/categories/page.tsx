import { Suspense } from 'react'
import CategoryListContainer from '../_features/categories/CategoryListContainer'
import CategorySkeletonLoader from '../_features/categories/CategoryListSkeletonLoader'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
}
async function Categories() {
  return (
    <Suspense fallback={<CategorySkeletonLoader />}>
      <CategoryListContainer />
    </Suspense>
  )
}

export default Categories
