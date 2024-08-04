import { formatDate, FULL_DATE_FORMAT } from '@/app/_utils/dates'
import { getPriorityBackgroundColor } from '@/app/_utils/helpers'
import { Tables } from '@/database.types'
import { BsCalendarEvent } from 'react-icons/bs'

type Props = {
  task?: Tables<'tasks'>
}

function TaskDetailsModal({ task }: Props) {
  if (!task) return null

  return (
    <div className="flex w-full grid-cols-[1fr_10rem] flex-col gap-6 lg:grid lg:w-[600px]">
      <p className="flex-1 border-r">{task.description}</p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-32 w-24">
            <svg
              className="size-full rotate-180"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-orange-100"
                stroke-width="3"
                stroke-dasharray={`100 100`}
                stroke-linecap="round"
              ></circle>

              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-orange-600"
                stroke-width="1"
                stroke-dasharray={`${task?.points} 100`}
                stroke-linecap="round"
              ></circle>
            </svg>

            <div className="absolute start-1/2 top-9 -translate-x-1/2 text-center">
              <span className="text-2xl font-bold text-orange-600">
                {task?.points}
              </span>
              <span className="block text-xs text-orange-600">Points</span>
            </div>
          </div>
        </div>

        <div
          className={`rounded-md p-2 text-center font-semibold ${getPriorityBackgroundColor(task?.priority ?? '')}`}
        >
          {task?.priority}
        </div>

        <div
          className={`mt-4 flex items-center gap-4 rounded-md bg-gray-200 p-2 text-center text-gray-900`}
          title={formatDate(task?.created_at, FULL_DATE_FORMAT)}
        >
          <BsCalendarEvent />

          <span className="whitespace-nowrap text-sm">
            {' '}
            {formatDate(task?.created_at)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsModal
