'use client'

import { HiOutlinePlus } from 'react-icons/hi'
import Modal, { ModalWindow, OpenModal } from './Modal'
import { Tables } from '@/database.types'
import CreateTaskForm from './CreateTaskForm'

type Props = {
  categories: Tables<'categories'>[]
}
const CreateNewTask = ({ categories }: Props) => {
  return (
    <Modal>
      <OpenModal name="new-task">
        <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-white">
          <span> New Task</span>
          <HiOutlinePlus fontSize={20} />
        </button>
      </OpenModal>

      <ModalWindow name="new-task" label="Create New Task">
        <CreateTaskForm categories={categories} />
      </ModalWindow>
    </Modal>
  )
}

export default CreateNewTask
