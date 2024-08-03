import TasksChart from './TasksChart'
import TotalItems from './TotalItems'
import TodayActivity from './TodayActivity'
import { getCategories } from '@/app/_services/categoriesService'
import { getTasks } from '@/app/_services/tasksServices'

export default async function LoggedInDashboard() {
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
