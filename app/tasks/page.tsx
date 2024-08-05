import { Suspense } from 'react'
import TasksCategories from '../_features/tasks/TasksCategories'
import TaskListSkeletonLoader from '../_features/tasks/TaskListSkeletonLoader'

type Props = {
  searchParams: {
    priority?: string
  }
}
async function Tasks({ searchParams }: Props) {
  const priority = searchParams.priority ?? 'all'

  return (
    <div className="flex h-full flex-col gap-3">
      <Suspense fallback={<TaskListSkeletonLoader />}>
        <TasksCategories filter={priority} />
      </Suspense>
    </div>
  )
}

export default Tasks
