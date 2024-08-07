import { ReactNode } from 'react'
import AppTasksProvider from '../_lib/AppTasksProvider'
import AppCategoriesProvider from '../_lib/AppCategoriesProvider'

function TasksLayout({ children }: { children: ReactNode }) {
  return (
    <AppTasksProvider>
      <AppCategoriesProvider>{children}</AppCategoriesProvider>
    </AppTasksProvider>
  )
}

export default TasksLayout
