import { Menu, Toggle, List, Button } from '@/app/_components/Menus'
import Modal, { OpenModal, ModalWindow } from '@/app/_components/Modal'
import { Tables } from '@/database.types'
import { Suspense } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import dynamic from 'next/dynamic'
import { getPriorityBorderColor } from '@/app/_utils/helpers'
const EditTask = dynamic(() => import('./EditTask'))
const TaskDetailsModal = dynamic(() => import('./TaskDetailsModal'))
const DeleteTask = dynamic(() => import('./DeleteTask'))

function TaskCard({ task }: { task: Tables<'tasks'> }) {
  return (
    <>
      <Modal key={task.id}>
        <div
          className={`relative h-40 cursor-pointer rounded-lg border-b-8 bg-white p-3 ${getPriorityBorderColor(task.priority ?? '')}`}
        >
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
                  <Button ariaLabel="Edit" icon={<HiPencil />}>
                    Edit
                  </Button>
                </OpenModal>

                <OpenModal name="delete-task">
                  <Button ariaLabel="Delete" icon={<HiTrash />}>
                    Delete
                  </Button>
                </OpenModal>
              </List>

              <ModalWindow
                name="delete-task"
                label={`Delete ${task?.title ?? ''}`}
              >
                <DeleteTask taskId={task.id} />
              </ModalWindow>

              <ModalWindow name="edit-task" label="Edit Task">
                <EditTask taskToEdit={task} />
              </ModalWindow>
            </Menu>

            <ModalWindow name="task-details" label={task?.title ?? ''}>
              <Suspense fallback={<span>Loading</span>}>
                <TaskDetailsModal task={task} />
              </Suspense>
            </ModalWindow>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TaskCard
