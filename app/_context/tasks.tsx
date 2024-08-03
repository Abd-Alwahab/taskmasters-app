'use client'

import { Tables } from '@/database.types'
import { createContext, ReactNode, useContext } from 'react'

type TasksContextType = {
  tasks: Tables<'tasks'>[]
}

const TasksContext = createContext<TasksContextType>({
  tasks: [],
})

function TasksProvider({
  children,
  tasks,
}: {
  children: ReactNode
  tasks: Tables<'tasks'>[]
}) {
  return (
    <TasksContext.Provider value={{ tasks }}>{children}</TasksContext.Provider>
  )
}

const useTasks = () => {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}

export { TasksProvider, useTasks }
