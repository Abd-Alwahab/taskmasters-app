import { getTasks } from '@/app/_services/tasksServices'
import { Tables } from '@/database.types'
import { cache } from 'react'
import CategoriesList from './CategoriesList'

type Props = {
  categories: Tables<'categories'>[]
  filter?: string
}
async function Categories({ categories = [], filter }: Props) {
  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()
  return (
    <CategoriesList
      categories={categories}
      filter={filter}
      tasks={tasks ?? []}
    />
  )
}

export default Categories
