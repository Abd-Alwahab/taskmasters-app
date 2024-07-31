'use client'

import { Tables } from '@/database.types'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts'

type Props = {
  tasks: Tables<'tasks'>[]
}
function TasksChart({ tasks = [] }: Props) {
  const taskData = tasks?.map((task) => {
    return {
      id: task.id,
      createdAt: task.created_at,
    }
  })

  const formattedData = taskData?.reduce(
    (acc: { [key: string]: number }, task) => {
      const date = task.createdAt.split('T')[0] // Extract date only
      acc[date] = (acc[date] || 0) + 1
      return acc
    },
    {},
  )
  const chartData = Object.entries(formattedData).map(([date, count]) => ({
    date,
    tasksCreated: count,
  }))
  return (
    <>
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={chartData}>
          <Area dataKey="tasksCreated" fill="#8884d8" type="monotone" />
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip key="Tasks Created" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default TasksChart
