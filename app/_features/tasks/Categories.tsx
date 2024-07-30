import { getTasks } from '@/app/_services/tasksServices'
import { Tables } from '@/database.types'
import { cache } from 'react'
import CategoriesList from './CategoriesList'
import Filter from '@/app/_components/Filter'
import CreateNewTask from './CreateNewTask'

type Props = {
  categories: Tables<'categories'>[]
  filter?: string
}
async function Categories({ categories = [], filter }: Props) {
  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex w-full justify-between">
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
        <div className="flex size-full flex-col items-center justify-center gap-8">
          <span className="text-4xl font-semibold">No categories found</span>
          <button className="rounded-lg bg-gray-900 px-3 py-2 text-lg text-white">
            Create New Category
          </button>
        </div>
      )}
    </div>
  )
}

export default Categories
