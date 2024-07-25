'use server'

import { taskSchema } from '../_utils/validations/taskSchema'
import { revalidatePath } from 'next/cache'
import { createClient } from '../_utils/supabase/server'

export type NewTaskDataType = {
  title: string
  description: string
  priority: string
  category: number
  points: number
}
export async function createNewTaskAction(formData: NewTaskDataType) {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null

  const { user } = session

  const validatedUser = taskSchema.safeParse(formData)

  if (!validatedUser.success) return null

  const { error } = await createClient()
    .from('tasks')
    .insert([
      {
        ...validatedUser.data,
        userId: user?.id,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/planner')

  return { success: true }
}

export async function deleteTaskAction(id: number) {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null

  const { user } = session

  const { error } = await createClient()
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/planner')

  return { success: true }
}
