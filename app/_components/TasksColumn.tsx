'use client'

import { Tables } from '@/database.types'
import Modal, { ModalWindow } from './Modal'
import Menus from './Menus'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import DeleteTask from './DeleteTask'

function TasksColumn({
  tasks,
  label,
  categoryId,
}: {
  tasks: Tables<'tasks'>[]
  label: string
  categoryId: number
}) {
  const columnTasks = tasks?.filter((task) => task.category === categoryId)

  return (
    <Menus>
      <Modal>
        <div className="h-full rounded-lg bg-gray-200 shadow-lg">
          <h3 className=" rounded-lg bg-gray-900 py-3 text-center text-lg font-bold text-white">
            {label}
          </h3>
          <div className="flex flex-col gap-3 p-3 ">
            {columnTasks?.map((task) => (
              <div
                className="relative cursor-pointer rounded-lg bg-white p-3"
                key={task.id}
              >
                <h3 className="mb-2 font-bold">{task.title}</h3>
                <p>{task.description}</p>

                <div className="absolute right-3 top-2">
                  <Menus.Menu>
                    <Menus.Toggle id={String(task.id) ?? ''} />

                    <Menus.List id={String(task.id) ?? ''}>
                      <Modal.Open name="edit-task">
                        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                      </Modal.Open>

                      <Modal.Open name="delete-task">
                        <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                      </Modal.Open>
                    </Menus.List>

                    <ModalWindow name="edit-task" label={task?.title ?? ''}>
                      <span>Edit </span>
                    </ModalWindow>

                    <ModalWindow name="delete-task" label="Delete">
                      <DeleteTask taskId={task.id} />
                    </ModalWindow>
                  </Menus.Menu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </Menus>
  )
}

export default TasksColumn
