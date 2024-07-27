import { getTasks } from '../_services/tasksServices'
import TasksColumn from '../_features/tasks/TasksColumn'
import { Tables } from '@/database.types'
import { cache } from 'react'

type Props = {
  categories: Tables<'categories'>[]
  filter?: string
}
async function Categories({ categories = [], filter }: Props) {
  const tasks = cache(async () => await getTasks())
  const tasksResult = await tasks()
  return (
    <div
      className="grid h-full gap-4 overflow-x-auto"
      style={{
        gridTemplateColumns: `repeat(${categories.length}, minmax(300px, 1fr))`,
      }}
    >
      {categories
        ?.sort((a, b) => (a?.orderIndex ?? 0) - (b?.orderIndex ?? 0))
        ?.map((category) => (
          <div className="h-full" key={category.id}>
            <TasksColumn
              label={category.name ?? ''}
              tasks={tasksResult ?? []}
              categoryId={category.id}
              filter={filter}
            />
          </div>
        ))}
    </div>
  )
}

export default Categories
