'use client'

import { HiOutlinePlus } from 'react-icons/hi'
import { OpenModal } from '../../_components/Modal'
import { useCategories } from '@/app/_context/categories'

function CreateTaskFormButton() {
  const { categories } = useCategories()

  if (categories.length === 0) return null
  return (
    <OpenModal name="new-task">
      <button className="flex items-center gap-1 rounded-lg border-2 border-solid border-white bg-gray-900 px-3.5 py-2.5 text-white">
        <span className="text-sm"> New Task</span>
        <HiOutlinePlus fontSize={18} />
      </button>
    </OpenModal>
  )
}

export default CreateTaskFormButton
