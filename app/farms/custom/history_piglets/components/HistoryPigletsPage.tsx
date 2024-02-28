'use client'
import { BackButton } from '@/app/components'
import React from 'react'
import { InfoRowPiglets, TasksRowPiglets } from '.'

const HistoryPigletsPage = () => {
  
  return (
    <>
      <BackButton/>
      <InfoRowPiglets/>
      <TasksRowPiglets/>
    </>
  )
}

export default HistoryPigletsPage