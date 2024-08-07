import { cache, ReactNode } from 'react'
import { getTasks } from '../_services/tasksServices'
import { TasksProvider } from '../_context/tasks'

async function AppTasksProvider({ children }: { children: ReactNode }) {
  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()
  return <TasksProvider tasks={tasks ?? []}>{children}</TasksProvider>
}

export default AppTasksProvider
