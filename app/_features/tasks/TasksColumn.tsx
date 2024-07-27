import { Tables } from '@/database.types'
import Modal from '../../_components/Modal'
import Menus from '../../_components/Menus'
import TaskCard from './TaskCard'
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
  const columnTasks = tasks?.filter((task) => task.category === categoryId)
  let filteredTasks = columnTasks

  if (filter !== 'all')
    filteredTasks = columnTasks?.filter(
      (task) => task.priority?.toLowerCase() === filter?.toLowerCase(),
    )

  return (
    <Menus>
      <Modal>
        <div className="h-full rounded-lg bg-gray-200 shadow-lg">
          <h3 className=" rounded-lg bg-gray-900 py-3 text-center text-lg font-bold text-white">
            {label}
          </h3>
          <div className="flex flex-col gap-3 p-3 ">
            {filteredTasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </Modal>
    </Menus>
  )
}

export default TasksColumn
