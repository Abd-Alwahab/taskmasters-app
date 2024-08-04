'use client'

import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../_components/FormRow'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createNewCategoryAction,
  updateCategoryAction,
} from '@/app/_lib/actions'
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
}

const CreateTaskForm = ({ onCloseModal, categoryToEdit }: Props) => {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryToEdit || defaultValues,
  })

  const onSubmit = async (data: any) => {
    let result: { success: boolean; data?: any } | null

    if (categoryToEdit) {
      result = await updateCategoryAction(categoryToEdit?.id as number, data)
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
      className="flex w-full flex-col gap-5 lg:w-[600px]"
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

      <SubmitFormButton
        label={categoryToEdit ? 'Update Category' : 'Create Category'}
        pending={isSubmitting}
      />
    </form>
  )
}

export default CreateTaskForm
