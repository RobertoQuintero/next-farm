'use client'
import React, { useContext, useEffect } from 'react'
import { BackButton, DeleteComponent } from '@/app/components';
import { BirthsRow, InfoRow, TasksRow,UpdateCrossingForm, UpdateTask } from '.';
import AppModal from '@/app/components/AppModal';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { PostUpdatePig } from '../../components';
import Cookies from 'js-cookie'
import { ITask } from '@/interfaces';
import { UiContext } from '@/app/context/ui/UiContext';

const HistoryPage = () => {
  const {farmAction,pig,setPig,farmsError,farmsLoading,task,updateTasks} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  useEffect(() => {
    if(!pig){
      setPig(JSON.parse(Cookies.get('pig')!))
    }
  }, [])

  const onDelete = async() =>{
     const newTask={...task, status:false} as ITask

     const ok= await updateTasks(newTask)
     if(ok){
      toggleModal()
     }
     
  };
  
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
          {
            farmAction==='UPDATE-TASK'?<UpdateTask/>:<></>
          }
          {
            farmAction==='DELETE-TASK'?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError}/>:<></>
          }
        </AppModal>
      </div>
    </>
  )
}

export default HistoryPage