import { HiOutlinePlus } from 'react-icons/hi'
import Modal, { ModalWindow, OpenModal } from '../../_components/Modal'
import CreateTaskForm from './CreateTaskForm'

function CreateNewTask() {
  return (
    <Modal>
      <OpenModal name="new-task">
        <button className="flex items-center gap-1 rounded-lg border-2 border-solid border-white bg-gray-900 px-3.5 py-2.5 text-white">
          <span className="text-sm"> New Task</span>
          <HiOutlinePlus fontSize={18} />
        </button>
      </OpenModal>

      <ModalWindow name="new-task" label="Create New Task">
        <CreateTaskForm />
      </ModalWindow>
    </Modal>
  )
}

export default CreateNewTask
