'use client'
import React, { useContext } from 'react'
import { BackButton } from '@/app/components';
import { BirthsRow, InfoRow, TasksRow,UpdateCrossingForm } from '.';
import AppModal from '@/app/components/AppModal';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { PostUpdatePig } from '../../components';

const HistoryPage = () => {
  const {farmAction} = useContext(FarmsContext)
  return (
    <>
      <div>
        <BackButton/>
        <InfoRow/>
        <BirthsRow/>
        <TasksRow/>
        <AppModal>
          {
            farmAction==='EDIT'?<PostUpdatePig/>:<></>
          }
          {
            farmAction==='CROSSING'?<UpdateCrossingForm/>:<></>
          }
        </AppModal>
      </div>
    </>
  )
}

export default HistoryPage