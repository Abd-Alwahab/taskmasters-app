'use client'

import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../_components/FormRow'
import { zodResolver } from '@hookform/resolvers/zod'
import { createNewCategoryAction, updateTaskAction } from '@/app/_lib/actions'
import { categorySchema } from '../../_utils/validations/categorySchema'
import Input from '../../_components/Input'
import SubmitFormButton from '../../_components/SubmitFormButton'

type CategoryFormData = {
  id?: number
  name: string
  orderIndex: number
}

type Props = {
  onCloseModal?: () => void
  categoryToEdit?: CategoryFormData
}

const defaultValues = {
  name: '',
  orderIndex: 0,
}

const CreateTaskForm = ({ onCloseModal, categoryToEdit }: Props) => {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryToEdit || defaultValues,
  })

  const onSubmit = async (data: any) => {
    let result: { success: boolean; data?: any } | null

    if (categoryToEdit) {
      result = await updateTaskAction(categoryToEdit.id, data)
    } else {
      result = await createNewCategoryAction(data)
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
      <FormRow error={errors?.name?.message ?? ''}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Category Name" {...field} />
          )}
        />
      </FormRow>

      <FormRow error={errors?.orderIndex?.message ?? ''}>
        <Controller
          name="orderIndex"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Order Index"
              type="number"
              {...field}
              onChange={(e) => {
                field.onChange(parseInt(e.target.value, 10))
                setValue('orderIndex', parseInt(e.target.value, 10))
              }}
            />
          )}
        />
      </FormRow>

      <SubmitFormButton
        label={categoryToEdit ? 'Update Category' : 'Create Category'}
        pending={isSubmitting}
      />
    </form>
  )
}

export default CreateTaskForm
