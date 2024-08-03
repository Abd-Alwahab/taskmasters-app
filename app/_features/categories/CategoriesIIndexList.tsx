'use client'

import { Tables } from '@/database.types'
import CategoryCard from './CategoryCard'
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from '@hello-pangea/dnd'
import { useTransition, useOptimistic } from 'react'
import { updateCategoriesAction } from '@/app/_lib/actions'
import { useDevice } from '@/app/_context/device'

type Props = {
  categories: Tables<'categories'>[]
  categoriesTasks: { category: number }[]
}

function CategoriesIIndexList({ categories, categoriesTasks }: Props) {
  const { isDesktop } = useDevice()

  // eslint-disable-next-line no-unused-vars
  const [_, startTransition] = useTransition()
  const [optimisticState, setOptimisticState] = useOptimistic(
    categories,
    (currentState, params: any) => {
      return currentState.map((category) => {
        if (category.id === params.draggedCategory?.id) {
          return {
            ...category,
            orderIndex: params.replacedCategory?.orderIndex,
          }
        }

        if (category.id === params.replacedCategory?.id) {
          return {
            ...category,
            orderIndex: params.draggedCategory?.orderIndex,
          }
        }
        return category
      })
    },
  )

  async function onDragEnd(result: any) {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const draggedCategory = optimisticState?.find(
      (category) => category.orderIndex === Number(draggableId),
    )

    const replacedCategory = optimisticState
      ?.sort((a, b) => (a.orderIndex as number) - (b.orderIndex as number))
      .at(destination.index)

    startTransition(() =>
      setOptimisticState({ draggedCategory, replacedCategory }),
    )

    await updateCategoriesAction(
      categories.map((category) => {
        if (category.id === draggedCategory?.id) {
          return {
            ...category,
            orderIndex: replacedCategory?.orderIndex ?? 0,
          }
        }

        if (category.id === replacedCategory?.id) {
          return {
            ...category,
            orderIndex: draggedCategory?.orderIndex ?? 0,
          }
        }
        return category
      }),
    )
  }

  const indexes = optimisticState?.map((category) => category.orderIndex).sort()
  return (
    <div className="h-full bg-gray-100">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={'categories'}
          direction={isDesktop ? 'horizontal' : 'vertical'}
        >
          {(provided: DroppableProvided) => {
            return (
              <div
                className="flex h-full flex-col gap-3 overflow-x-auto lg:grid"
                style={{
                  gridTemplateColumns: `repeat(${indexes?.length ?? 0}, minmax(350px, 1fr))`,
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {indexes?.map((index, itemIndex) => {
                  const category = optimisticState?.find(
                    (c) => c.orderIndex === index,
                  ) as Tables<'categories'>

                  const categoryTasks = categoriesTasks?.filter(
                    (task) => task.category === category.id,
                  )

                  return (
                    <CategoryCard
                      key={category.orderIndex}
                      index={itemIndex}
                      category={category}
                      categoryTasks={categoryTasks}
                    />
                  )
                })}

                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default CategoriesIIndexList
