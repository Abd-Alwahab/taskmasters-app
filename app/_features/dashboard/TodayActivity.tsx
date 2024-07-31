import { Tables } from '@/database.types'
import { BiCategory } from 'react-icons/bi'
import { FaTasks } from 'react-icons/fa'

type Props = {
  tasks: Tables<'tasks'>[]
  categories: Tables<'categories'>[]
}
function TodayActivity({ tasks, categories }: Props) {
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
  )
}

export default TodayActivity
