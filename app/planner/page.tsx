import { cache, Suspense } from 'react'
import Categories from '../_components/Categories'
import CreateNewTask from '../_features/tasks/CreateNewTask'
import { getCategories } from '../_services/categoriesService'
import Spinner from '../_components/Spinner'
import Filter from '../_components/Filter'

type Props = {
  searchParams: {
    priority?: string
  }
}
async function Planner({ searchParams }: Props) {
  const categories = cache(async () => await getCategories())
  const categoriesResult = await categories()
  const priority = searchParams.priority ?? 'all'

  return (
    <div className="flex h-full flex-col gap-3">
      <div className=" flex w-full justify-between">
        <Filter
          options={[
            { label: 'All', value: 'all' },
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
          filterField="priority"
        />
        <CreateNewTask />
      </div>

      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Categories categories={categoriesResult ?? []} filter={priority} />
      </Suspense>
    </div>
  )
}

export default Planner
