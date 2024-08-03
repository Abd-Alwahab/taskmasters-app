import { Tables } from '@/database.types'
import { createClient } from '../_utils/supabase/server'

export async function getTasks() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { data: tasks, error } = await createClient()
    .from('tasks')
    .select('*')
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return tasks
}

export async function getTask(taskId: number) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { data: task, error } = await createClient()
    .from('tasks')
    .select('*')
    .eq('id', taskId)
    .eq('userId', user?.id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return task as Tables<'tasks'>
}

export async function getCategoriesTasks() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { data: tasks, error } = await createClient()
    .from('tasks')
    .select('category')
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return tasks
}
