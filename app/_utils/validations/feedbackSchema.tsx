import { z } from 'zod'

export const feedbackSchema = z.object({
  title: z
    .string({ required_error: 'Feedback title is required' })
    .min(2, 'Feedback title must be at least 2 characters long')
    .max(100, 'Feedback title must be less than 100 characters long'),
  description: z
    .string({ required_error: 'Feedback Description is required' })
    .min(2, 'Feedback Description must be at least 2 characters long')
    .max(1000, 'Feedback Description must be less than 1000 characters long'),
})
