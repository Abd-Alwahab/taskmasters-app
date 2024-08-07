import { Metadata } from 'next'
import TasksChart from '../_features/dashboard/TasksChart'
import TodayActivity from '../_features/dashboard/TodayActivity'
import TotalItems from '../_features/dashboard/TotalItems'
import { getCategories } from '../_services/categoriesService'
import { getTasks } from '../_services/tasksServices'

export const metadata: Metadata = {
  title: 'Dashboard | Task Masters App',
}

export default async function Dashboard() {
  const [tasks, categories] = await Promise.all([getTasks(), getCategories()])
  return (
    <div className="flex h-full flex-col gap-6 lg:gap-4">
      <TotalItems
        totalTasks={tasks?.length ?? 0}
        totalCategories={categories?.length ?? 0}
      />
      <TodayActivity tasks={tasks ?? []} categories={categories ?? []} />
      <div className="h-full flex-1 rounded-lg bg-white">
        {tasks?.length ? (
          <div className="hidden h-full lg:block">
            <TasksChart tasks={tasks ?? []} />
          </div>
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="text-4xl font-semibold">No tasks found</span>
          </div>
        )}
      </div>
    </div>
  )
}
