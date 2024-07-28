import { Tables } from '@/database.types'
import Menus from '../../_components/Menus'
import TaskCard from './TaskCard'

const priorityOrder: Record<'high' | 'medium' | 'low', number> = {
  high: 0,
  medium: 1,
  low: 2,
}

function TasksColumn({
  tasks,
  label,
  categoryId,
  filter,
}: {
  tasks: Tables<'tasks'>[]
  label: string
  categoryId: number
  filter?: string
}) {
  const columnTasks = tasks
    ?.filter((task) => task.category === categoryId)
    .sort((a, b) => {
      return (
        (priorityOrder[
          a.priority?.toLowerCase() as 'high' | 'medium' | 'low'
        ] ?? 0) -
        (priorityOrder[
          b.priority?.toLowerCase() as 'high' | 'medium' | 'low'
        ] ?? 0)
      )
    })

  let filteredTasks = columnTasks

  if (filter !== 'all')
    filteredTasks = columnTasks?.filter(
      (task) => task.priority?.toLowerCase() === filter?.toLowerCase(),
    )

  return (
    <Menus>
      <div className="h-full rounded-lg bg-gray-200 shadow-lg">
        <h3 className=" rounded-lg bg-gray-900 py-3 text-center text-lg font-bold text-white">
          {label}
        </h3>
        <div className="flex flex-col gap-3 p-3 ">
          {filteredTasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    </Menus>
  )
}

export default TasksColumn
