import { Tables } from '@/database.types'
import { createClient } from '../_utils/supabase/server'

export async function getCategories() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

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
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { data: categories, error } = await createClient()
    .from('categories')
    .select('orderIndex')
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  return categories as Tables<'categories'>[]
}
