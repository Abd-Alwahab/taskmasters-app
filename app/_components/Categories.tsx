import { getCategories } from '../_services/categoriesService'
import { getTasks } from '../_services/tasksServices'
import TasksColumn from './TasksColumn'

async function Categories() {
  const tasks = await getTasks()
  const categories = await getCategories()
  return (
    <div className={`flex h-full  gap-4 overflow-x-auto`}>
      {categories
        ?.sort((a, b) => (a?.orderIndex ?? 0) - (b?.orderIndex ?? 0))
        ?.map((category) => (
          <div className="h-full min-w-[335px]" key={category.id}>
            <TasksColumn
              label={category.name ?? ''}
              tasks={tasks ?? []}
              categoryId={category.id}
            />
          </div>
        ))}
    </div>
  )
}

export default Categories
