'use client'

import DeleteModal from '../../_components/DeleteModal'
import { useTransition } from 'react'
import { deleteCategoryAction } from '@/app/_lib/actions'

type Props = {
  onCloseModal?: () => void
  categoryId: number
}
function DeleteCategory({ categoryId, onCloseModal }: Props) {
  const [pending, startTransition] = useTransition()

  function handleDeleteCategory(id: number) {
    startTransition(async () => {
      const result = await deleteCategoryAction(id)

      if (result?.success) onCloseModal?.()
    })
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <DeleteModal
        onConfirm={() => handleDeleteCategory(categoryId)}
        pending={pending}
      />
    </div>
  )
}

export default DeleteCategory
