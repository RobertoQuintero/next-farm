import { SaveButton } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { ITask } from '@/interfaces'
import {  MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateTask = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {task,pigTypes,stages,farmsLoading,taskTypes,postTask} = useContext(FarmsContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>()

  const values={
    id_task:task?task.id_task:0,
    id_task_type:task?task.id_task_type:1,
    id_pig_type:task?task.id_pig_type:1,
    id_stage:task?task.id_stage:stages[0].id_stage,
    description:task?task.description:'',
    status:task?task.status:true,
    days:task?task.days:0,
    id_farm:task?task.id_farm:idFarm || localStorage.getItem('id_farm'),
  } as ITask

  const [pigType, setPigType] = useState(values.id_pig_type)

  const onSubmit=async(data:ITask)=>{
    const date= new Date()
    data.id_task=values.id_task
    data.status=values.status
    data.created_at=date
    data.updated_at=date
    data.id_pig_type=pigType
    data.id_farm=values.id_farm

    const ok=await postTask(data)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        size="small"
        label='Tipo'
        fullWidth
        value={pigType}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setPigType(+e.target.value)
        }}
        select >
        {
          pigTypes.length
          ?pigTypes.map(item=>(
            <MenuItem 
              key={item.id_pig_type} 
              value={item.id_pig_type}>
              {item.description}
            </MenuItem>
          ))
          :<div></div>
        }
      </TextField>
      <TextField
        size="small"
        label='Etapa'
        fullWidth
        defaultValue={values.id_stage}
        {...register('id_stage')} 
        select >
        {
          stages.filter(s=>s.id_pig_type===pigType).length
          ?stages.filter(s=>s.id_pig_type===pigType).map(item=>(
            <MenuItem 
              key={item.id_stage} 
              value={item.id_stage}>
              {item.description}
            </MenuItem>
          ))
          :<div></div>
        }
      </TextField>
      <TextField 
        size="small"
        fullWidth
        label='Nombre'
        type="text"
        defaultValue={values.description}
        {...register('description',{
          required:'Este campo es requerido',
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
        />
      <TextField
        size="small"
        label='Recurrencia'
        fullWidth
        defaultValue={values.id_task_type}
        {...register('id_task_type')} 
        select >
        {
          taskTypes.length
          ?taskTypes.map(item=>(
            <MenuItem 
              key={item.id_task_type} 
              value={item.id_task_type}>
              {item.description}
            </MenuItem>
          ))
          :<div></div>
        }
      </TextField>
      <TextField 
        size="small"
        fullWidth
        label='Días'
        type="number"
        defaultValue={values.days}
        {...register('days',{
          required:'Este campo es requerido',
        })}
        error={!!errors.days}
        helperText={errors.days?.message}
        />
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
