import { cache } from 'react'
import { getTasks } from './_services/tasksServices'
import { FaChevronRight, FaTasks } from 'react-icons/fa'
import { getCategories } from './_services/categoriesService'
import { BiCategory } from 'react-icons/bi'
import Link from 'next/link'

export default async function Home() {
  const tasksPromise = cache(async () => await getTasks())
  const tasks = await tasksPromise()

  const categoriesPromise = cache(async () => await getCategories())
  const categories = await categoriesPromise()

  const today = new Date()
  today.setHours(0, 0, 0, 0) // Start of today

  const tasksCreatedToday = tasks?.filter((task) => {
    const createdAt = new Date(task.created_at)
    return createdAt >= today
  })

  const categoriesCreatedToday = categories?.filter((task) => {
    const createdAt = new Date(task.created_at)
    return createdAt >= today
  })

  return (
    <div className="flex h-full flex-col gap-4 bg-gray-100 p-4 shadow-lg">
      <div className="grid grid-cols-2 gap-4">
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

      <div className="h-[400px] rounded-lg bg-gray-800">
        {tasksCreatedToday?.length ? (
          <div className="flex flex-col gap-5 p-8">
            <span className="text-3xl font-semibold text-white">Today</span>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid h-fit max-h-[400px] grid-cols-1  gap-4 overflow-y-auto">
                {tasksCreatedToday?.map((task) => (
                  <div
                    key={task.id}
                    className="flex h-fit items-center gap-2 rounded-lg bg-curious-blue-800 p-3"
                  >
                    <div>
                      <FaTasks fontSize={18} color="white" />
                    </div>
                    <span className="font-semibold text-gray-300">
                      {task.title}
                    </span>

                    <span className="ml-auto rounded-lg bg-red-600 px-2 py-1 text-sm font-semibold text-gray-300">
                      {
                        categories?.find(
                          (category) => category.id === task.category,
                        )?.name
                      }
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid h-fit max-h-[400px] grid-cols-1 gap-4  overflow-y-auto">
                {categoriesCreatedToday?.map((category) => (
                  <div
                    key={category.id}
                    className="flex h-fit items-center gap-2 rounded-lg bg-curious-blue-800 p-3"
                  >
                    <div>
                      <BiCategory fontSize={18} color="white" />
                    </div>
                    <span className="font-semibold text-gray-300">
                      {category.name}
                    </span>

                    <span className="ml-auto rounded-lg bg-red-600 px-2 py-1 text-sm font-semibold text-gray-300">
                      {
                        tasks?.filter((task) => task.category === category.id)
                          ?.length
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <span> No tasks created today</span>
        )}
      </div>
    </div>
  )
}
