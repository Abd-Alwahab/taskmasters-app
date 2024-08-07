import { getTasks } from '@/app/_services/tasksServices'
import TasksCategoriesList from './TasksCategoriesList'
import NoCategoriesFound from './NoCategoriesFound'
import { getCategories } from '@/app/_services/categoriesService'

type Props = {
  filter?: string
}
async function Categories({ filter }: Props) {
  const [categories, tasks] = await Promise.all([getCategories(), getTasks()])

  return (
    <div className="flex h-full flex-col gap-4 ">
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
