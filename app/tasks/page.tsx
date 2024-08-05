import { Suspense } from 'react'
import Spinner from '../_components/Spinner'
import TasksCategories from '../_features/tasks/TasksCategories'

type Props = {
  searchParams: {
    priority?: string
  }
}
async function Tasks({ searchParams }: Props) {
  const priority = searchParams.priority ?? 'all'

  return (
    <div className="flex h-full flex-col gap-3">
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <TasksCategories filter={priority} />
      </Suspense>
    </div>
  )
}

export default Tasks
