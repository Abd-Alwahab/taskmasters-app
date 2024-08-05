import { HiOutlinePlus } from 'react-icons/hi'
import Modal, { ModalWindow, OpenModal } from '../../_components/Modal'
import CreateTaskForm from './CreateTaskForm'
import { Tables } from '@/database.types'

type Props = {
  categories?: Tables<'categories'>[]
  tasks?: Tables<'tasks'>[]
}

function CreateNewTask({ categories, tasks }: Props) {
  return (
    <Modal>
      <OpenModal name="new-task">
        <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-3 text-white">
          <span> New Task</span>
          <HiOutlinePlus fontSize={20} />
        </button>
      </OpenModal>

      <ModalWindow name="new-task" label="Create New Task">
        <CreateTaskForm categories={categories} tasks={tasks} />
      </ModalWindow>
    </Modal>
  )
}

export default CreateNewTask
