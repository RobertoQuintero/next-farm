import {  MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { ITask } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { buildDate } from '@/utils'
import { AuthContext } from '@/app/context/auth/AuthContext'

export const PostNewTask = () => {
  const {toggleModal} = useContext(UiContext)
  const {user} = useContext(AuthContext)
  const {pigStages,pig,piglet,pigTasks,farmsLoading,postNewTask} = useContext(FarmsContext)
  const newTasks=pigTasks.filter(p=>pig?p.id_pig_type===3||p.id_pig_stage===14:p.id_pig_type===1||p.id_pig_stage===14)
  const [addedDate, setAddedDate] = useState<Date | null>(new Date())
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>()

  const values={
    id_pig_task:newTasks[0].id_pig_task
  } as ITask

  const onSubmit=async(data:ITask)=>{

    const task={
      id_task:0,
      id_pig:pig?pig.id_pig:null,
      id_lot_piglets:piglet?piglet.id_lot_piglets:null,
      created_at:buildDate(new Date()),
      done:false,
      id_user:user?.id_user,
      start_date:buildDate(addedDate!),
      status:true,
      end_date:buildDate(addedDate!),
      comment:'',
      id_pig_task:data.id_pig_task
    } as ITask

    // console.log(task)
    const ok= await postNewTask(task)
    if(ok){
      toggleModal()
    }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      {/* <TextField 
        size="small"
        fullWidth
        label='Nombre'
        type="text"
        defaultValue={values.name}
        {...register('name',{
          required:'Este campo es requerido',
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
        /> */}
        <TextField
          size="small"
          label='Tarea'
          fullWidth
          defaultValue={values.id_pig_task}
          {...register('id_pig_task')} 
          select >
          {
            newTasks.length
            ?newTasks.map(item=>(
              <MenuItem 
                key={item.id_pig_task} 
                value={item.id_pig_task}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha</p>
        <DatePickerElement date={addedDate} setDate={setAddedDate}/>
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
