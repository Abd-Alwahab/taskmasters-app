'use client'

import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../_components/FormRow'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackSchema } from '../../_utils/validations/feedbackSchema'
import Input from '../../_components/Input'
import SubmitFormButton from '../../_components/SubmitFormButton'
import TextArea from '@/app/_components/TextArea'
import { sendFeedbackAction } from '@/app/_lib/actions'

export type FeedbackFormData = {
  title: string
  description: string
}

const defaultValues: FeedbackFormData = {
  title: '',
  description: '',
}

const NewFeedbackForm = () => {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues,
  })

  const onSubmit = async (data: FeedbackFormData) => {
    const response = await sendFeedbackAction(data)

    if (response?.success) {
      reset()
    }
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
