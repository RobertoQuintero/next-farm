import React from 'react'
import TasksPage from './components/TasksPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hibye | Tareas',
  description: 'Hibye Granjas',
}

const Tasks = () => <TasksPage/>

export default Tasks