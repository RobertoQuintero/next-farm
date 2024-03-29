import { Metadata } from 'next'
import React from 'react'
import TaskLogPage from './components/TaskLogPage'

export const metadata: Metadata = {
  title: 'Hibye | Bitácora Actividades',
  description: 'Hibye Granjas',
}

const TaskLog = () => <TaskLogPage/>

export default TaskLog