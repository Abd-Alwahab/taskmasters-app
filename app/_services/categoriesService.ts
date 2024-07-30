import { Tables } from '@/database.types'
import { createClient } from '../_utils/supabase/server'

export async function getCategories() {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null
  const { user } = session

  const { data: categories, error } = await createClient()
    .from('categories')
    .select('*')
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return categories as Tables<'categories'>[]
}

export async function getCategoriesIndexes() {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null
  const { user } = session

  const { data: categories, error } = await createClient()
    .from('categories')
    .select('orderIndex')
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return categories as Tables<'categories'>[]
}

export async function getCategoriesCount() {
  const {
    data: { session },
  } = await createClient().auth.getSession()

  if (!session) return null

  const { user } = session

  const { data: tasks, error } = await createClient()
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return tasks
}
