import { cache } from 'react'
import { getTasksCount } from './_services/tasksServices'
import { FaChevronRight, FaTasks } from 'react-icons/fa'
import { getCategoriesCount } from './_services/categoriesService'
import { BiCategory } from 'react-icons/bi'
import Link from 'next/link'

export default async function Home() {
  const tasksPromise = cache(async () => await getTasksCount())
  const tasks = await tasksPromise()

  const categoriesPromise = cache(async () => await getCategoriesCount())
  const categories = await categoriesPromise()

  return (
    <div className="h-full bg-gray-100 shadow-lg">
      <div className="grid grid-cols-2 gap-4 p-4">
        <Link
          className="transition-all hover:translate-y-[-3px] hover:border-curious-blue-800 hover:shadow-xl"
          href="/planner"
        >
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-curious-blue-800">
              <FaTasks fontSize={32} color="white" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-200">TASKS</span>
              <span className="text-3xl font-bold text-gray-300">
                {tasks?.length ?? 0}
              </span>
            </div>

            <div className="ml-auto">
              <FaChevronRight fontSize={18} color="white" />
            </div>
          </div>
        </Link>

        <Link
          className="transition-all hover:translate-y-[-4px] hover:shadow-2xl"
          href="/categories"
        >
          <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#FBB13C]">
              <BiCategory fontSize={32} color="white" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-200">
                CATEGORIES
              </span>
              <span className="text-3xl font-bold text-gray-300">
                {categories?.length ?? 0}
              </span>
            </div>

            <div className="ml-auto">
              <FaChevronRight fontSize={18} color="white" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
