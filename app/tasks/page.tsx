import { Suspense } from 'react'
import TasksCategories from '../_features/tasks/TasksCategories'
import TaskListSkeletonLoader from '../_features/tasks/TaskListSkeletonLoader'
import { Metadata } from 'next'
import Filter from '../_components/Filter'
import CreateNewTask from '../_features/tasks/CreateNewTask'

export const metadata: Metadata = {
  title: 'Tasks',
}
type Props = {
  searchParams: {
    priority?: string
  }
}
async function Tasks({ searchParams }: Props) {
  const priority = searchParams.priority ?? 'all'

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex w-full flex-col-reverse items-start justify-between gap-4 rounded-lg bg-white py-2 lg:flex-row lg:items-center lg:gap-0 lg:p-0">
        <Filter
          options={[
            { label: 'All', value: 'all' },
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
          filterField="priority"
        />

        <div className="lg:ml-auto">
          <CreateNewTask />
        </div>
      </div>

      <Suspense fallback={<TaskListSkeletonLoader />} key={priority}>
        <TasksCategories filter={priority} />
      </Suspense>
    </div>
  )
}

export default Tasks
