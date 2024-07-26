import { cache, Suspense } from 'react'
import Categories from '../_components/Categories'
import CreateNewTask from '../_features/tasks/CreateNewTask'
import { getCategories } from '../_services/categoriesService'
import Spinner from '../_components/Spinner'

async function Planner(...props: any) {
  const categories = cache(async () => await getCategories())
  const categoriesResult = await categories()
  return (
    <div className="h-full">
      <div className="mb-4 ml-auto w-fit">
        <CreateNewTask categories={categoriesResult ?? []} />
      </div>
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Categories categories={categoriesResult ?? []} />
      </Suspense>
    </div>
  )
}

export default Planner
