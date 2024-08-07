'use server'

import { createClient } from '../_utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { taskSchema } from '../_utils/validations/taskSchema'
import { categorySchema } from '../_utils/validations/categorySchema'
import { Tables } from '@/database.types'
import { cache } from 'react'
import { getCategoriesIndexes } from '../_services/categoriesService'
import { findCategoryWithHighestOrderIndex } from '../_utils/helpers'

export async function loginAction() {
  const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`

  const { data, error } = await createClient().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return redirect(data?.url)
}

export async function logoutAction() {
  await createClient().auth.signOut()
  redirect('/')
}

export type NewTaskDataType = {
  title: string
  description: string
  priority: string
  category: number
  points: number
}
export async function createNewTaskAction(formData: NewTaskDataType) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

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

  revalidatePath('/tasks')

  return { success: true }
}

export async function deleteTaskAction(id: number) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { error } = await createClient()
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')

  return { success: true }
}

export async function updateTaskAction(id: any, data: any) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { error, data: updatedTask } = await createClient()
    .from('tasks')
    .update({
      ...data,
    })
    .eq('id', id)
    .eq('userId', user?.id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')

  return { success: true, data: updatedTask }
}

export async function deleteCategoryAction(id: number) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { error } = await createClient()
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('userId', user?.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')
  revalidatePath('/categories')

  return { success: true }
}

export async function createNewCategoryAction(formData: {
  name: string
  orderIndex: number
}) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const validatedCategory = categorySchema.safeParse(formData)

  if (!validatedCategory.success) return null

  const categoriesIndexesPromise = cache(
    async () => await getCategoriesIndexes(),
  )
  const categoriesIndexes = await categoriesIndexesPromise()
  const categoryWithHighestOrderIndex =
    findCategoryWithHighestOrderIndex(categoriesIndexes)

  const { error } = await createClient()
    .from('categories')
    .insert([
      {
        name: validatedCategory.data.name,
        userId: user?.id,
        orderIndex: (categoryWithHighestOrderIndex?.orderIndex || 0) + 1,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')
  revalidatePath('/categories')

  return { success: true }
}

export async function updateCategoryAction(id: number, data: any) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { error, data: updatedCategory } = await createClient()
    .from('categories')
    .update({
      ...data,
    })
    .eq('id', id)
    .eq('userId', user?.id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')
  revalidatePath('/categories')

  return { success: true, data: updatedCategory }
}

export async function updateCategoriesAction(data: Tables<'categories'>[]) {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  if (!user) return null

  const { error, data: updatedCategory } = await createClient()
    .from('categories')
    .upsert(data)
    .match({ userId: user?.id })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')
  revalidatePath('/categories')

  return { success: true, data: updatedCategory }
}
