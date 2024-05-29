'use client'
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { BackButton, DeleteComponent } from '@/app/components';
import { BirthsRow, CommentsRow, InfoRow, TasksRow,UpdateBirthForm,UpdateConfirmForm,UpdateCrossingForm, UpdateLactation } from '.';
import AppModal from '@/app/components/AppModal';
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { LossForm, PostNewTask, PostUpdatePig, UpdateComment, UpdateDate, UpdateTask } from '../../components';
import Cookies from 'js-cookie'
import { IComment, ITask } from '@/interfaces';
import { useUi } from '@/app/context/ui/useUi';
import { PostUpdateComment } from './PostUpdateComment';
import { buildDate } from '@/utils';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie'

const HistoryPage = () => {
  const {farmAction,pig,setPig,farmsError,farmsLoading,task,updateTasks,getCode,comment,postComments,births,pigs} = useContext(FarmsContext)
  const {toggleModal} = useUi()
  const [text, setText] = useState('')
  const router= useRouter()

  useEffect(() => {
    if(!pig){
      setPig(JSON.parse(Cookies.get('pig')!))
    }
    getCode('lot')
  }, [pig])

  const onDelete = async() =>{
     const newTask={...task,
       status:false,
       id_birth:pig?births[births.length-1].id_birth:0
      } as ITask

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
        <div style={{display:'flex',gap:'.5rem'}}>

        <BackButton/>
        <form onSubmit={(e:SyntheticEvent)=>{
          e.preventDefault()
          const thisPig= pigs.find(p=>p.pig_ubication===text.toUpperCase())
          if(thisPig){
            setPig(thisPig)
            Cookie.set('pig',JSON.stringify(pig))
            router.push('/farms/custom/history')
          } 
        }}>
        <TextField 
          sx={{width:'150px'}}
          size="small"
          fullWidth
          label='Filtra jaula'          
          type="text"
          value={text}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setText(e.target.value)
          }}
        />
        </form>
        </div>
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
          {
            farmAction==='UPDATE-DATE'?<UpdateDate/>:<></>
          }
        </AppModal>
      </div>
    </>
  )
}

export default HistoryPage