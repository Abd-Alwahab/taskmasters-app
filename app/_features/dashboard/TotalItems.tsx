import React from 'react'
import { FaChevronRight, FaTasks } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'
import Link from 'next/link'

type Props = {
  totalTasks: number
  totalCategories: number
}
function TotalItems({ totalCategories, totalTasks }: Props) {
  return (
    <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
      <Link
        className="overflow-hidden rounded-lg transition-all  hover:translate-y-[-3px] hover:shadow-xl"
        href="/planner"
      >
        <div className="flex items-center gap-4 bg-white px-1 py-2 lg:p-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-blue-800 lg:size-16">
            <FaTasks className="text-2xl lg:text-[32px]" color="white" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">TASKS</span>
            <span className="text-xl font-bold text-gray-700 lg:text-3xl">
              {totalTasks ?? 0}
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
        <div className="flex items-center gap-4  bg-white  px-1 py-2 lg:p-4">
          <div className="flex  size-12 items-center justify-center rounded-full bg-amber-500 lg:size-16">
            <BiCategory className="text-2xl lg:text-[32px]" color="white" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              CATEGORIES
            </span>
            <span className="text-xl font-bold text-gray-700 lg:text-3xl">
              {totalCategories ?? 0}
            </span>
          </div>

          <div className="ml-auto">
            <FaChevronRight fontSize={18} color="text-gray-700" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TotalItems
