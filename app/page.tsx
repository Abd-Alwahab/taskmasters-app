import { cache } from 'react'
import { getTasks } from './_services/tasksServices'
import { FaChevronRight, FaTasks } from 'react-icons/fa'
import { getCategories } from './_services/categoriesService'
import { BiCategory } from 'react-icons/bi'
import Link from 'next/link'
import TasksChart from './_features/dashboard/TasksChart'

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
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Link
          className="overflow-hidden rounded-lg transition-all  hover:translate-y-[-3px] hover:shadow-xl"
          href="/planner"
        >
          <div className="flex items-center gap-4 bg-white p-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-800">
              <FaTasks fontSize={32} color="white" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">TASKS</span>
              <span className="text-3xl font-bold text-gray-700">
                {tasks?.length ?? 0}
              </span>
            </div>

            <div className="ml-auto">
              <FaChevronRight fontSize={18} color="text-gray-700" />
            </div>
          </div>
        </Link>

        <Link
          className="overflow-hidden rounded-lg transition-all hover:translate-y-[-4px] hover:shadow-xl"
          href="/categories"
        >
          <div className="flex items-center gap-4  bg-white p-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-amber-500">
              <BiCategory fontSize={32} color="white" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                CATEGORIES
              </span>
              <span className="text-3xl font-bold text-gray-700">
                {categories?.length ?? 0}
              </span>
            </div>

            <div className="ml-auto">
              <FaChevronRight fontSize={18} color="text-gray-700" />
            </div>
          </div>
        </Link>
      </div>

      <div className="flex h-[400px] flex-col gap-4 rounded-lg bg-white p-8">
        <span className="text-3xl font-semibold text-gray-900">Today</span>

        {!tasksCreatedToday?.length && !categoriesCreatedToday?.length ? (
          <div className="mt-14 h-full text-center text-3xl">
            No tasks or categories created today
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-12">
            {tasksCreatedToday?.length ? (
              <div className="grid h-fit max-h-[400px] grid-cols-1 overflow-y-auto">
                {tasksCreatedToday?.map((task) => (
                  <div
                    key={task.id}
                    className="flex h-fit items-center gap-3 border-b  border-gray-300 py-5"
                  >
                    <div className="flex size-7 items-center justify-center rounded-full bg-blue-800">
                      <FaTasks fontSize={14} color="white" />
                    </div>
                    <span className="font-semibold">{task.title}</span>

                    <span className="ml-auto rounded-lg bg-gray-800 px-2 py-1 text-sm font-semibold text-gray-300">
                      {
                        categories?.find(
                          (category) => category.id === task.category,
                        )?.name
                      }
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {categoriesCreatedToday?.length ? (
              <div className="grid h-fit max-h-[400px] grid-cols-1  overflow-y-auto">
                {categoriesCreatedToday?.map((category) => (
                  <div
                    key={category.id}
                    className="flex h-fit items-center gap-3 border-b  border-gray-300 py-5"
                  >
                    <div className="flex size-7 items-center justify-center rounded-full bg-amber-500">
                      <BiCategory fontSize={15} color="white" />
                    </div>
                    <span className="font-semibold">{category.name}</span>

                    <span className="ml-auto flex size-6 items-center  justify-center rounded-full bg-gray-800 text-sm font-semibold text-gray-300">
                      {
                        tasks?.filter((task) => task.category === category.id)
                          ?.length
                      }
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="h-full flex-1 bg-white">
        {tasks?.length ? (
          <TasksChart tasks={tasks ?? []} />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="text-4xl font-semibold">No tasks found</span>
          </div>
        )}
      </div>
    </div>
  )
}
