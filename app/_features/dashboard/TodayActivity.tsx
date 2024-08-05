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
    <div className="flex h-fit max-h-full flex-col gap-4 overflow-y-auto rounded-lg bg-white px-1 py-3 lg:max-h-[300px] lg:min-h-[230px] lg:p-8">
      <span className="text-3xl font-semibold text-gray-900">Today</span>

      {!tasksCreatedToday?.length && !categoriesCreatedToday?.length ? (
        <div className="mt-2 h-full text-center text-xl lg:mt-6 lg:text-3xl">
          No tasks or categories created today
        </div>
      ) : (
        <div className="flex  grid-cols-2 flex-col gap-4 lg:grid lg:gap-12">
          {tasksCreatedToday?.length ? (
            <div className="grid h-fit grid-cols-1">
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
            <div className="grid h-fit  grid-cols-1">
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
