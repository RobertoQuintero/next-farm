import { TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { ITask } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'

export const UpdateTask = () => {
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,task,updateTasks} = useContext(FarmsContext)
  const {user} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>()

  const values={
    start_date:task?task.start_date:new Date(),
    comment:task?task.comment:''
  } as ITask

  const [addedDate, setAddedDate] = useState<Date | null>(new Date(values.start_date))

  const onSubmit=async(data:ITask)=>{
    const newTask={
      ...task,
      start_date:addedDate!,
      comment:data.comment,
      done:true,
      id_user:user?.id_user
    } as ITask

    const ok=await updateTasks(newTask)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Comentario'
        type="text"
        defaultValue={values.comment}
        {...register('comment')}
        />
        <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha aplicación</p>
          <DatePickerElement date={addedDate} setDate={setAddedDate}/>
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
