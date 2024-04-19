'use client'
import React, { useContext, useEffect } from 'react'
import { BackButton, DeleteComponent } from '@/app/components';
import { BirthsRow, CommentsRow, InfoRow, TasksRow,UpdateBirthForm,UpdateConfirmForm,UpdateCrossingForm, UpdateLactation } from '.';
import AppModal from '@/app/components/AppModal';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { LossForm, PostNewTask, PostUpdatePig, UpdateComment, UpdateTask } from '../../components';
import Cookies from 'js-cookie'
import { IComment, ITask } from '@/interfaces';
import { useUi } from '@/app/context/ui/useUi';
import { PostUpdateComment } from './PostUpdateComment';
import { buildDate } from '@/utils';

const HistoryPage = () => {
  const {farmAction,pig,setPig,farmsError,farmsLoading,task,updateTasks,getCode,comment,postComments} = useContext(FarmsContext)
  const {toggleModal} = useUi()
  
  useEffect(() => {
    if(!pig){
      setPig(JSON.parse(Cookies.get('pig')!))
    }
    getCode('lot')
  }, [pig])

  const onDelete = async() =>{
     const newTask={...task, status:false} as ITask

     const ok= await updateTasks(newTask)
     if(ok){
      toggleModal()
     }
  };
  const onDeleteComment = async() =>{
     const newComment={...comment, 
      status:false,
      updated_at:buildDate(new Date())
    } as IComment

     const ok= await postComments(newComment)
     if(ok){
      toggleModal()
     }
  };
  
  return (
    <>
      <div>
        <BackButton/>
        <InfoRow/>
        <CommentsRow/>
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
          {
            farmAction==='CONFIRM'?<UpdateConfirmForm/>:<></>
          }
          {
            farmAction==='PREGNED'?<UpdateConfirmForm/>:<></>
          }
          {
            farmAction==='BIRTH'?<UpdateBirthForm/>:<></>
          }
          {
            farmAction==='COMMENT'?<UpdateBirthForm/>:<></>
          }
          {
            farmAction==='COMMENT-TASK'?<UpdateComment/>:<></>
          }
          {
            farmAction==='LACTATION'?<UpdateLactation/>:<></>
          }
          {
            farmAction==='CREATE-COMMENT' ||farmAction==='UPDATE-COMMENT'?<PostUpdateComment/>:<></>
          }
          {
            farmAction==='DELETE-COMMENT'?<DeleteComponent onDelete={onDeleteComment} loading={farmsLoading} error={farmsError}/>:<></>
          }
          {
            farmAction==='LOSS'?<LossForm/>:<></>
          }
          {
            farmAction==='ADD-TASK'?<PostNewTask/>:<></>
          }
        </AppModal>
      </div>
    </>
  )
}

export default HistoryPage