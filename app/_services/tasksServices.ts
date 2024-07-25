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
