import { z } from 'zod'

export const categorySchema = z.object({
  name: z
    .string({ required_error: 'Category name is required' })
    .min(2, 'Category name must be at least 2 characters long')
    .max(60, 'Category name must be less than 40 characters long'),
  orderIndex: z
    .number({ required_error: 'Order index is required' })
    .optional(),
})
