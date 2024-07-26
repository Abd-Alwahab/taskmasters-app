import { Menu, Toggle, List, Button } from '@/app/_components/Menus'
import { OpenModal, ModalWindow } from '@/app/_components/Modal'
import { Tables } from '@/database.types'
import { Suspense } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import DeleteTask from './DeleteTask'
import EditTask from './EditTask'
import TaskDetailsModal from './TaskDetailsModal'

function TaskCard({ task }: { task: Tables<'tasks'> }) {
  return (
    <>
      <div className="relative cursor-pointer rounded-lg bg-white p-3">
        <OpenModal name="task-details">
          <div className="absolute right-0 top-0 size-full " />
        </OpenModal>
        <h3 className="mb-2 font-bold">{task.title}</h3>
        <p>{task.description}</p>

        <div className="absolute right-3 top-2">
          <Menu>
            <Toggle id={String(task.id) ?? ''} />

            <List id={String(task.id) ?? ''}>
              <OpenModal name="edit-task">
                <Button icon={<HiPencil />}>Edit</Button>
              </OpenModal>

              <OpenModal name="delete-task">
                <Button icon={<HiTrash />}>Delete</Button>
              </OpenModal>
            </List>

            <ModalWindow name="edit-task" label={task?.title ?? ''}>
              <Suspense fallback={<span>Loading</span>}>
                <EditTask taskId={task.id} />
              </Suspense>
            </ModalWindow>

            <ModalWindow name="delete-task" label="Delete">
              <DeleteTask taskId={task.id} />
            </ModalWindow>
          </Menu>
        </div>
      </div>

      <ModalWindow name="task-details" label={task?.title ?? ''}>
        <Suspense fallback={<span>Loading</span>}>
          <TaskDetailsModal task={task} />
        </Suspense>
      </ModalWindow>
    </>
  )
}

export default TaskCard
