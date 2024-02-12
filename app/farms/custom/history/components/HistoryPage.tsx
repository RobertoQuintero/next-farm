'use client'
import React, { useContext, useEffect } from 'react'
import { BackButton } from '@/app/components';
import { BirthsRow, InfoRow, TasksRow,UpdateCrossingForm } from '.';
import AppModal from '@/app/components/AppModal';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { PostUpdatePig } from '../../components';
import Cookies from 'js-cookie'

const HistoryPage = () => {
  const {farmAction,pig,setPig} = useContext(FarmsContext)

  useEffect(() => {
    if(!pig){
      setPig(JSON.parse(Cookies.get('pig')!))
    }
  }, [])
  
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