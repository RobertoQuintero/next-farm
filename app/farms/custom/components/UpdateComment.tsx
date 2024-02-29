import {  TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { ITask } from '@/interfaces'

export const UpdateComment = () => {
  const {farmsLoading,task,updateTasks} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const [comment, setcomment] = useState(task?.comment!)


  const onSubmit=async(e:SyntheticEvent)=>{
    e.preventDefault()
    
    const newTask= {...task,comment:comment.trim()} as ITask

    // console.log(newTask)
    // return
    if(task?.comment===newTask.comment){
      toggleModal()
      return
    }
    const ok=await updateTasks(newTask)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={onSubmit}>
      <TextField 
        multiline
        rows={2}
        size="small"
        fullWidth
        label='Comentario'
        type="text"
        value={comment}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setcomment(e.target.value)
        }}
        />
        
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
