import { getCategories } from '../../_services/categoriesService'
import { getTask } from '../../_services/tasksServices'
import CreateTaskForm from './CreateTaskForm'

async function EditTask({
  taskId,
  onCloseModal,
}: {
  taskId: number
  onCloseModal?: () => void
}) {
  const categories = await getCategories()
  const task = await getTask(taskId)

  return (
    <div>
      <CreateTaskForm
        categories={categories ?? []}
        taskToEdit={{
          title: task?.title ?? '',
          description: task?.description ?? '',
          points: task?.points ?? 0,
          priority: task?.priority ?? '',
          category: task?.category ?? 0,
          id: task?.id ?? 0,
        }}
        onCloseModal={onCloseModal}
      />
    </div>
  )
}

export default EditTask
