import { getTasks } from '@/app/_services/tasksServices'
import { Tables } from '@/database.types'
import { cache } from 'react'
import CategoriesList from './CategoriesList'
import Filter from '@/app/_components/Filter'
import CreateNewTask from './CreateNewTask'
import NoCategoriesFound from './NoCategoriesFound'

type Props = {
  categories: Tables<'categories'>[]
  filter?: string
}
async function Categories({ categories = [], filter }: Props) {
  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()
  return (
    <div className="flex h-full flex-col gap-4 ">
      <div className="flex w-full items-center justify-between rounded-lg bg-white px-5 py-2">
        {tasks?.length ? (
          <Filter
            options={[
              { label: 'All', value: 'all' },
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
            ]}
            filterField="priority"
          />
        ) : null}

        {categories?.length ? (
          <div className="ml-auto">
            <CreateNewTask />
          </div>
        ) : null}
      </div>
      {categories?.length ? (
        <CategoriesList
          categories={categories}
          filter={filter}
          tasks={tasks ?? []}
        />
      ) : (
        <NoCategoriesFound />
      )}
    </div>
  )
}

export default Categories
