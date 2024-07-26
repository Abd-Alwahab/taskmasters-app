import { Tables } from '@/database.types'
import Modal from '../../_components/Modal'
import Menus from '../../_components/Menus'
import TaskCard from './TaskCard'
function TasksColumn({
  tasks,
  label,
  categoryId,
}: {
  tasks: Tables<'tasks'>[]
  label: string
  categoryId: number
}) {
  const columnTasks = tasks?.filter((task) => task.category === categoryId)

  return (
    <Menus>
      <Modal>
        <div className="h-full rounded-lg bg-gray-200 shadow-lg">
          <h3 className=" rounded-lg bg-gray-900 py-3 text-center text-lg font-bold text-white">
            {label}
          </h3>
          <div className="flex flex-col gap-3 p-3 ">
            {columnTasks?.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      </Modal>
    </Menus>
  )
}

export default TasksColumn
