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

export async function getCategoriesTasks() {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null

  const { user } = session

  const { data: tasks, error } = await createClient()
    .from('tasks')
    .select('category')
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return tasks
}

export async function getTasksCount() {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null

  const { user } = session

  const { data: tasks, error } = await createClient()
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return tasks
}
