'use client'

import DeleteModal from '../../_components/DeleteModal'
import { useTransition } from 'react'
import { deleteTaskAction } from '../../_services/actoins'

type Props = {
  onCloseModal?: () => void
  taskId: number
}
function DeleteTask({ taskId, onCloseModal }: Props) {
  const [pending, startTransition] = useTransition()

  function handleDeleteTask(id: number) {
    startTransition(async () => {
      const result = await deleteTaskAction(id)

      if (result?.success) onCloseModal?.()
    })
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <DeleteModal
        onConfirm={() => handleDeleteTask(taskId)}
        pending={pending}
      />
    </div>
  )
}

export default DeleteTask
