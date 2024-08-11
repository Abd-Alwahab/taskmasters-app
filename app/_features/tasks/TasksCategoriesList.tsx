'use client'

import { Tables } from '@/database.types'
import TasksColumn from './TasksColumn'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { useOptimistic, useTransition } from 'react'
import { updateTaskAction } from '@/app/_lib/actions'

type Props = {
  categories: Tables<'categories'>[]
  filter?: string
  tasks?: Tables<'tasks'>[]
}
function TasksCategoriesList({ categories = [], filter, tasks = [] }: Props) {
  // eslint-disable-next-line no-unused-vars
  const [_, startTransition] = useTransition()
  const [optimisticState, setOptimisticState] = useOptimistic(
    tasks,
    (
      currentState,
      params: {
        targetTask: Tables<'tasks'>
        targetCategory: Tables<'categories'>
      },
    ) => {
      return currentState.map((task) => {
        if (task.id === params.targetTask?.id) {
          return {
            ...task,
            category: params.targetCategory?.id,
          }
        }
        return task
      })
    },
  )
  async function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const targetTask = tasks?.find(
      (task) => task.id === Number(draggableId),
    ) as Tables<'tasks'>
    const targetCategory = categories?.find(
      (category) => category.id === Number(destination.droppableId),
    ) as Tables<'categories'>

    startTransition(() => setOptimisticState({ targetTask, targetCategory }))
    await updateTaskAction(targetTask?.id, {
      category: targetCategory?.id,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="grid h-[calc(100vh-160px)] gap-6 overflow-auto"
        style={{
          gridTemplateColumns: `repeat(${categories.length}, minmax(350px, 1fr))`,
        }}
      >
        {categories
          ?.sort((a, b) => (a?.orderIndex ?? 0) - (b?.orderIndex ?? 0))
          ?.map((category) => {
            return (
              <div className="h-full" key={category.id}>
                <TasksColumn
                  label={category.name ?? ''}
                  tasks={optimisticState ?? []}
                  categoryId={category.id}
                  filter={filter}
                />
              </div>
            )
          })}
      </div>
    </DragDropContext>
  )
}

export default TasksCategoriesList
