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
import { Tables } from '@/database.types'
import ErrorMessage from '@/app/_components/ErrorMessage'
import { useEffect, useState } from 'react'

type CategoryFormData = {
  id?: number
  name: string
  orderIndex: number
}

type Props = {
  onCloseModal?: () => void
  categoryToEdit?: CategoryFormData
  categories?: Tables<'categories'>[]
}

const defaultValues = {
  name: '',
}

const CreateNewCategoryForm = ({
  onCloseModal,
  categoryToEdit,
  categories,
}: Props) => {
  const [duplicatedCategoryName, setDuplicatedCategoryName] = useState(false)
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryToEdit || defaultValues,
  })

  // Reset form when modal closes or when categoryToEdit changes
  useEffect(() => {
    reset(categoryToEdit || defaultValues) // Reset to defaultValues when creating a new category
  }, [onCloseModal, categoryToEdit, reset])

  const onSubmit = async (data: any) => {
    const duplicatedCategory = categories?.find(
      (category) => category.name?.toLowerCase() === data.name?.toLowerCase(),
    )

    if (duplicatedCategory) {
      setDuplicatedCategoryName(true)
      return
    }

    let result: { success: boolean; data?: any } | null

    if (categoryToEdit) {
      result = await updateCategoryAction(categoryToEdit?.id as number, data)
    } else {
      result = await createNewCategoryAction(data)
    }

    if (result?.success) {
      onCloseModal?.()
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 lg:w-[600px]"
    >
      <FormRow error={errors?.name?.message ?? ''} label="Category Name">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Category Name"
              {...field}
              onChange={(e) => {
                field.onChange(e)
                setDuplicatedCategoryName(false)
              }}
            />
          )}
        />
      </FormRow>

      {duplicatedCategoryName ? (
        <ErrorMessage message="Category already exists" />
      ) : (
        <SubmitFormButton
          label={categoryToEdit ? 'Update Category' : 'Create Category'}
          pending={isSubmitting}
        />
      )}
    </form>
  )
}

export default CreateNewCategoryForm
