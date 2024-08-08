'use client'

import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../_components/FormRow'
import Select from '../../_components/Select'
import TextArea from '../../_components/TextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { createNewTaskAction, updateTaskAction } from '@/app/_lib/actions'
import { taskSchema } from '../../_utils/validations/taskSchema'
import Input from '../../_components/Input'
import SubmitFormButton from '../../_components/SubmitFormButton'
import ErrorMessage from '@/app/_components/ErrorMessage'
import { Tables } from '@/database.types'
import { useTasks } from '@/app/_context/tasks'
import { useCategories } from '@/app/_context/categories'
import { useEffect } from 'react'

type TaskFormData = {
  title: string
  description: string
  points: number
  priority: string
  category: number
  id?: number
}

type Props = {
  onCloseModal?: () => void
  taskToEdit?: TaskFormData
  tasks?: Tables<'tasks'>[]
  categories?: Tables<'categories'>[]
}

const defaultValues = {
  title: '',
  description: '',
  points: 0,
  priority: 'Low',
  category: 1,
}

const MAX_TASKS_PER_CATEGORY = 10

const CreateTaskForm = ({ onCloseModal, taskToEdit }: Props) => {
  const { tasks } = useTasks()
  const { categories } = useCategories()

  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: taskToEdit || {
      ...defaultValues,
      category: categories?.[0].id,
    },
  })

  const selectedCategory = watch('category')

  // Reset form when modal closes or when taskToEdit changes
  useEffect(() => {
    reset(
      taskToEdit || {
        ...defaultValues,
        category: categories?.[0].id,
      },
    ) // Reset to defaultValues when creating a new task
  }, [onCloseModal, taskToEdit, reset, categories])

  const onSubmit = async (data: any) => {
    let result: { success: boolean; data?: any } | null

    if (taskToEdit) {
      result = await updateTaskAction(taskToEdit.id, data)
    } else {
      result = await createNewTaskAction(data)
    }

    if (result?.success) {
      onCloseModal?.()
    }
  }

  const tasksWithSameCategory = tasks?.filter(
    (task) => task.category === selectedCategory,
  ).length

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 lg:w-[600px]"
    >
      <FormRow error={errors?.title?.message ?? ''} label="Title">
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input placeholder="Task Title" {...field} />}
        />
      </FormRow>

      <FormRow error={errors?.description?.message ?? ''} label="Description">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="Task description"
              {...field}
              maxLength={1000}
            />
          )}
        />
      </FormRow>

      <FormRow error={errors?.category?.message ?? ''} label="Category">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(e) => {
                field.onChange(parseInt(e.target.value, 10))
                setValue('category', parseInt(e.target.value, 10))
              }}
              placeholder="Category"
              options={
                categories
                  ?.sort((a, b) => (a?.orderIndex ?? 0) - (b?.orderIndex ?? 0))
                  .map((category) => ({
                    label: category.name ?? '',
                    value: category.id.toString() ?? '',
                  })) ?? []
              }
            />
          )}
        />
      </FormRow>

      <FormRow error={errors?.points?.message ?? ''} label="Points (1-100)">
        <Controller
          name="points"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Task points"
              type="number"
              {...field}
              onChange={(e) => {
                field.onChange(parseInt(e.target.value, 10))
                setValue('points', parseInt(e.target.value, 10))
              }}
            />
          )}
        />
      </FormRow>

      <FormRow error={errors?.priority?.message ?? ''} label="Priority">
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Priority"
              options={[
                {
                  label: 'Low',
                  value: 'Low',
                },
                { label: 'Medium', value: 'Medium' },
                { label: 'High', value: 'High' },
              ]}
            />
          )}
        />
      </FormRow>

      {tasksWithSameCategory === MAX_TASKS_PER_CATEGORY ? (
        <div className="flex justify-center text-base">
          <ErrorMessage message="You have already created the maximum number of tasks in this category" />
        </div>
      ) : (
        <SubmitFormButton
          label={taskToEdit ? 'Update Task' : 'Create Task'}
          pending={isSubmitting}
        />
      )}
    </form>
  )
}

export default CreateTaskForm
