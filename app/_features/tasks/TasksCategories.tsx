import { getTasks } from '@/app/_services/tasksServices'
import TasksCategoriesList from './TasksCategoriesList'
import Filter from '@/app/_components/Filter'
import CreateNewTask from './CreateNewTask'
import NoCategoriesFound from './NoCategoriesFound'
import { getCategories } from '@/app/_services/categoriesService'

type Props = {
  filter?: string
}
async function Categories({ filter }: Props) {
  const [categories, tasks] = await Promise.all([getCategories(), getTasks()])

  return (
    <div className="flex h-full flex-col gap-4 ">
      <div className="flex w-full flex-col-reverse items-start justify-between gap-4 rounded-lg bg-white py-2 lg:flex-row lg:items-center lg:gap-0 lg:px-5">
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
          <div className="lg:ml-auto">
            <CreateNewTask categories={categories} tasks={tasks ?? []} />
          </div>
        ) : null}
      </div>
      {categories?.length ? (
        <TasksCategoriesList
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
