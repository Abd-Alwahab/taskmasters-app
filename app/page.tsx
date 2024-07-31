import { cache } from 'react'
import { getTasks } from './_services/tasksServices'
import { getCategories } from './_services/categoriesService'
import TasksChart from './_features/dashboard/TasksChart'
import TotalItems from './_features/dashboard/TotalItems'
import TodayActivity from './_features/dashboard/TodayActivity'

export default async function Home() {
  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()

  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()

  return (
    <div className="flex h-full flex-col gap-4">
      <TotalItems
        totalTasks={tasks?.length ?? 0}
        totalCategories={categories?.length ?? 0}
      />

      <TodayActivity tasks={tasks ?? []} categories={categories ?? []} />

      <div className="h-full flex-1 bg-white">
        {tasks?.length ? (
          <TasksChart tasks={tasks ?? []} />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="text-4xl font-semibold">No tasks found</span>
          </div>
        )}
      </div>
    </div>
  )
}
