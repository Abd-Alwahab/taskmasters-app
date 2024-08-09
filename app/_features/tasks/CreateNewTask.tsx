import Modal from '../../_components/Modal'
import CreateTaskForm from './CreateTaskForm'
import dynamic from 'next/dynamic'
import CreateTaskFormButton from './CreateTaskFormButton'

const ModalWindow = dynamic(
  () => import('@/app/_components/Modal').then((mod) => mod.ModalWindow),
  {
    ssr: false,
  },
)

function CreateNewTask() {
  return (
    <Modal>
      <CreateTaskFormButton />

      <ModalWindow name="new-task" label="Create New Task">
        <CreateTaskForm />
      </ModalWindow>
    </Modal>
  )
}

export default CreateNewTask
