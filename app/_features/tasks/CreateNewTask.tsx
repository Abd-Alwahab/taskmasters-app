import { HiOutlinePlus } from 'react-icons/hi'
import Modal, { ModalWindow, OpenModal } from '../../_components/Modal'
import CreateTaskForm from './CreateTaskForm'

function CreateNewTask() {
  return (
    <Modal>
      <OpenModal name="new-task">
        <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-3 text-white">
          <span> New Task</span>
          <HiOutlinePlus fontSize={20} />
        </button>
      </OpenModal>

      <ModalWindow name="new-task" label="Create New Task">
        <CreateTaskForm />
      </ModalWindow>
    </Modal>
  )
}

export default CreateNewTask
