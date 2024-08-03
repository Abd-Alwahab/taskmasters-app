import { cache, Suspense } from 'react'
import { getCategories } from '../_services/categoriesService'
import Spinner from '../_components/Spinner'
import Categories from '../_features/tasks/Categories'

type Props = {
  searchParams: {
    priority?: string
  }
}
async function Tasks({ searchParams }: Props) {
  const categories = cache(async () => await getCategories())
  const categoriesResult = await categories()
  const priority = searchParams.priority ?? 'all'

  return (
    <div className="flex h-full flex-col gap-3">
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Categories categories={categoriesResult ?? []} filter={priority} />
      </Suspense>
    </div>
  )
}

export default Tasks
