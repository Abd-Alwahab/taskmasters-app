import { Controller, useForm } from 'react-hook-form'
import FormRow from './FormRow'
import Select from './Select'
import TextArea from './TextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { createNewTaskAction } from '../_services/actoins'
import { taskSchema } from '../_utils/validations/taskSchema'
import Input from './Input'
import { Tables } from '@/database.types'
import SubmitFormButton from './SubmitFormButton'

type Props = {
  categories: Tables<'categories'>[]
  onCloseModal?: () => void
}

const CreateTaskForm = ({ categories, onCloseModal }: Props) => {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm<{
    title: string
    description: string
    points: number
    priority: string
    category: number
  }>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit = async (data: any) => {
    const result = await createNewTaskAction(data)

    if (result?.success) {
      reset()
      onCloseModal?.()
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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

      <SubmitFormButton label="Create Task" pending={isSubmitting} />
    </form>
  )
}

export default CreateTaskForm
