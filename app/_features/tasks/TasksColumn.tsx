'use client'

import { Tables } from '@/database.types'
import Menus from '../../_components/Menus'
import TaskCard from './TaskCard'
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd'

const priorityOrder: Record<'high' | 'medium' | 'low', number> = {
  high: 0,
  medium: 1,
  low: 2,
}

type Props = {
  tasks: Tables<'tasks'>[]
  label: string
  categoryId: number
  filter?: string
}
function TasksColumn({ tasks, label, categoryId, filter }: Props) {
  const columnTasks = tasks
    ?.filter((task) => task.category === categoryId)
    .sort((a, b) => {
      return (
        (priorityOrder[
          a.priority?.toLowerCase() as 'high' | 'medium' | 'low'
        ] ?? 0) -
        (priorityOrder[
          b.priority?.toLowerCase() as 'high' | 'medium' | 'low'
        ] ?? 0)
      )
    })

  let filteredTasks = columnTasks

  if (filter !== 'all')
    filteredTasks = columnTasks?.filter(
      (task) => task.priority?.toLowerCase() === filter?.toLowerCase(),
    )

  return (
    <Menus>
      <div className="h-full rounded-lg bg-gray-200 shadow-lg">
        <h3 className=" rounded-lg bg-gray-900 py-3 text-center text-lg font-bold text-white">
          {label}
        </h3>
        <Droppable droppableId={String(categoryId) ?? ''} direction="vertical">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
            return (
              <div
                className={`flex h-full flex-col gap-3 p-3 transition-all ${snapshot.isDraggingOver ? 'bg-gray-300 shadow-2xl' : ''}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredTasks?.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </div>
    </Menus>
  )
}

export default TasksColumn
