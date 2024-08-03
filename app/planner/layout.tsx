import { cache, ReactNode } from 'react'
import { getCategories } from '../_services/categoriesService'
import { CategoriesProvider } from '../_context/categories'
import { TasksProvider } from '../_context/tasks'
import { getTasks } from '../_services/tasksServices'

async function PlannerLayout({ children }: { children: ReactNode }) {
  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()
  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()
  return (
    <CategoriesProvider categories={categories ?? []}>
      <TasksProvider tasks={tasks ?? []}>{children}</TasksProvider>
    </CategoriesProvider>
  )
}

export default PlannerLayout
