import { Tables } from '@/database.types'
import { createClient } from '../_utils/supabase/server'

export async function getTasks() {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null

  const { user } = session

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
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null

  const { user } = session

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
