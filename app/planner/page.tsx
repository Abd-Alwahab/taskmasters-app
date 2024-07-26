import { cache, Suspense } from 'react'
import Categories from '../_components/Categories'
import CreateNewCategory from '../_features/tasks/CreateNewTask'
import { getCategories } from '../_services/categoriesService'
import Spinner from '../_components/Spinner'

async function Planner() {
  const categories = cache(async () => await getCategories())
  const categoriesResult = await categories()
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="h-full">
        <div className="mb-4 ml-auto w-fit">
          <CreateNewCategory categories={categoriesResult ?? []} />
        </div>

        <Categories categories={categoriesResult ?? []} />
      </div>
    </Suspense>
  )
}

export default Planner
