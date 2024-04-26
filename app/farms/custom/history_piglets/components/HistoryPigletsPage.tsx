'use client'
import { BackButton, DeleteComponent } from '@/app/components'
import React, { useContext, useEffect } from 'react'
import { InfoRowPiglets, LossRowPiglets, MovePiglets, TasksRowPiglets, UpdatePiglets } from '.'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { LossForm, PostNewTask, UpdateComment, UpdateTask } from '../../components'
import Cookies from 'js-cookie'
import { PostUpdateComment } from '../../history/components/PostUpdateComment'
import { buildDate } from '@/utils'
import { IComment } from '@/interfaces'
import { UiContext } from '@/app/context/ui/UiContext'
import { CommentsRow } from './CommentsRow'

const HistoryPigletsPage = () => {
  const {farmAction,piglet,setPiglet,getCode,farmsLoading,farmsError,comment,postComments} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  
  useEffect(() => {
    if(!piglet){
      setPiglet(JSON.parse(Cookies.get('piglet')!))
    }
    getCode('lot')
  }, [])

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
      <BackButton/>
      <InfoRowPiglets/>
      <CommentsRow/>
      <LossRowPiglets/>
      <TasksRowPiglets/>
      <AppModal>
      {
        farmAction==='COMMENT-TASK'?<UpdateComment/>:<></>
      }
      {
        farmAction==='UPDATE-TASK'?<UpdateTask/>:<></>
      }
      {
        farmAction==='EDIT'?<UpdatePiglets/>:<></>
      }
      {
        farmAction==='MOVE'?<MovePiglets/>:<></>
      }
      {
        farmAction==='LOSS'?<LossForm/>:<></>
      }
      {
        farmAction==='ADD-TASK'?<PostNewTask/>:<></>
      }
      {
        farmAction==='CREATE-COMMENT' ||farmAction==='UPDATE-COMMENT'?<PostUpdateComment/>:<></>
      }
      {
        farmAction==='DELETE-COMMENT'?<DeleteComponent onDelete={onDeleteComment} loading={farmsLoading} error={farmsError}/>:<></>
      }
      </AppModal>
    </>
  )
}

export default HistoryPigletsPage