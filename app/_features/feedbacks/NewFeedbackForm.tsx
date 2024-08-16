'use client'

import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../_components/FormRow'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema } from '../../_utils/validations/categorySchema'
import Input from '../../_components/Input'
import SubmitFormButton from '../../_components/SubmitFormButton'
import { useEffect } from 'react'
import TextArea from '@/app/_components/TextArea'

type FeedbackFormData = {
  title: string
  description: string
}

type Props = {
  onCloseModal?: () => void
}

const defaultValues = {
  title: '',
}

const NewFeedbackForm = ({ onCloseModal }: Props) => {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  })

  // Reset form when modal closes or when categoryToEdit changes
  useEffect(() => {
    reset(defaultValues) // Reset to defaultValues when creating a new category
  }, [onCloseModal, reset])

  const onSubmit = async () => {
    onCloseModal?.()
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 lg:w-[600px]"
    >
      <FormRow error={errors?.title?.message ?? ''}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input placeholder="Feedback Title" {...field} />
          )}
        />
      </FormRow>

      <FormRow error={errors?.description?.message ?? ''}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="Feedback Description"
              {...field}
              style={{ height: '200px' }}
            />
          )}
        />
      </FormRow>

      <SubmitFormButton label="Send" pending={isSubmitting} />
    </form>
  )
}

export default NewFeedbackForm
