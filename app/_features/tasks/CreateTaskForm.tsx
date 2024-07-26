'use client'

import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../_components/FormRow'
import Select from '../../_components/Select'
import TextArea from '../../_components/TextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { createNewTaskAction, updateTaskAction } from '../../_services/actoins'
import { taskSchema } from '../../_utils/validations/taskSchema'
import Input from '../../_components/Input'
import { Tables } from '@/database.types'
import SubmitFormButton from '../../_components/SubmitFormButton'

type TaskFormData = {
  title: string
  description: string
  points: number
  priority: string
  category: number
  id?: number
}

type Props = {
  categories: Tables<'categories'>[]
  onCloseModal?: () => void
  taskToEdit?: TaskFormData
}

const defaultValues = {
  title: '',
  description: '',
  points: 0,
  priority: 'Low',
  category: 1,
}

const CreateTaskForm = ({ categories, onCloseModal, taskToEdit }: Props) => {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: taskToEdit || defaultValues,
  })

  const onSubmit = async (data: any) => {
    let result: { success: boolean; data?: any } | null

    if (taskToEdit) {
      result = await updateTaskAction(taskToEdit.id, data)
    } else {
      result = await createNewTaskAction(data)
    }

    if (result?.success) {
      reset(result?.data ?? defaultValues)

      onCloseModal?.()
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[600px] flex-col gap-5"
    >
      <FormRow error={errors?.title?.message ?? ''}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input placeholder="Task Title" {...field} />}
        />
      </FormRow>

      <FormRow error={errors?.description?.message ?? ''}>
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

      <FormRow error={errors?.points?.message ?? ''}>
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

      <FormRow error={errors?.priority?.message ?? ''}>
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

      <FormRow error={errors?.category?.message ?? ''}>
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
                categories.map((category) => ({
                  label: category.name ?? '',
                  value: category.id.toString() ?? '',
                })) ?? []
              }
            />
          )}
        />
      </FormRow>

      <SubmitFormButton
        label={taskToEdit ? 'Update Task' : 'Create Task'}
        pending={isSubmitting}
      />
    </form>
  )
}

export default CreateTaskForm
