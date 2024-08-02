import { cache } from 'react'
import { getTasks } from './_services/tasksServices'
import { getCategories } from './_services/categoriesService'
import TasksChart from './_features/dashboard/TasksChart'
import TotalItems from './_features/dashboard/TotalItems'
import TodayActivity from './_features/dashboard/TodayActivity'
import { createClient } from './_utils/supabase/server'
import LogoutHomePage from './_features/dashboard/LogoutHomePage'

export default async function Home() {
  const supabase = createClient()
  const userPromise = cache(async () => await supabase.auth.getUser())
  const user = await userPromise()

  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()

  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()

  const isLoggedIn = user?.data.user !== null

  return (
    <div className="flex h-full flex-col gap-6 lg:gap-4">
      {isLoggedIn ? (
        <>
          {' '}
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
          </div>{' '}
        </>
      ) : (
        <LogoutHomePage />
      )}
    </div>
  )
}
