'use client'

import CreateCategoryForm from './CreateNewCategoryForm'
import { Tables } from '@/database.types'

function EditCategory({
  categoryToEdit,
  onCloseModal,
}: {
  categoryToEdit?: Tables<'categories'>
  onCloseModal?: () => void
}) {
  return (
    <div>
      <CreateCategoryForm
        categoryToEdit={{
          name: categoryToEdit?.name ?? '',
          id: categoryToEdit?.id ?? 0,
        }}
        onCloseModal={onCloseModal}
      />
    </div>
  )
}

export default EditCategory
