'use client'

import { useModal } from '@/app/_components/Modal'
import CreateTaskForm from './CreateTaskForm'
import { Tables } from '@/database.types'

function EditTask({
  taskToEdit,
  onCloseModal,
  ...others
}: {
  taskToEdit?: Tables<'tasks'>
  onCloseModal?: () => void
}) {
  const { close } = useModal()
  return (
    <div>
      <CreateTaskForm
        taskToEdit={{
          title: taskToEdit?.title ?? '',
          description: taskToEdit?.description ?? '',
          points: taskToEdit?.points ?? 0,
          priority: taskToEdit?.priority ?? '',
          category: taskToEdit?.category ?? 0,
          id: taskToEdit?.id ?? 0,
        }}
        onCloseModal={close}
      />
    </div>
  )
}

export default EditTask
