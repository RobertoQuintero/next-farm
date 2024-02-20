import { SaveButton } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IPigTask} from '@/interfaces'
import {  MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateTask = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {task,pigTypes,stages,farmsLoading,taskTypes,postTask,pigTask,pigStages,stageTaskTypes} = useContext(FarmsContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPigTask>()

  const values={
    id_pig_task:pigTask?pigTask.id_pig_task:0,
    id_pig_stage:pigTask?pigTask.id_pig_stage:pigStages[0].id_pig_stage,
    description:pigTask?pigTask.description:'',
    status:pigTask?pigTask.status:true,
    days:pigTask?pigTask.days:0,
    while_days:pigTask?pigTask.while_days:0,
    id_farm:pigTask?pigTask.id_farm:idFarm ,
    id_stage_task_type:pigTask?pigTask.id_stage_task_type:3,
  } as IPigTask

  const [pigType, setPigType] = useState(pigStages.find( p=>p.id_pig_stage===values.id_pig_stage)?.id_pig_type)
  const [newStages, setNewStages] = useState(pigStages.filter(p=>p.id_pig_type===3))
  const [pigStage, setpigStage] = useState(values.id_pig_stage)
 

  const onSubmit=async(data:IPigTask)=>{
    const date= new Date()
    data.id_pig_task=values.id_pig_task
    data.status=values.status
    data.created_at=date
    data.id_farm=values.id_farm
    data.id_pig_stage=pigStage

    // console.log(data)
    // return
    const ok=await postTask(data)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        size="small"
        label='Tipo cerdo'
        fullWidth
        value={pigType}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setPigType(+e.target.value)
          setNewStages(pigStages.filter(p=>p.id_pig_type===Number(e.target.value)))
          setpigStage(pigStages.filter(p=>p.id_pig_type===Number(e.target.value))[0].id_pig_stage)
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
        value={pigStage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setpigStage(+e.target.value)
        }}
        select >
        {
          newStages.length
          ?newStages.map(item=>(
            <MenuItem 
              key={item.id_pig_stage} 
              value={item.id_pig_stage}>
              {item.description}
            </MenuItem>
          ))
          :<div></div>
        }
      </TextField>
      <TextField
        size="small"
        label='Tipo de Actividad'
        fullWidth
        defaultValue={values.id_stage_task_type}
        {...register('id_stage_task_type')} 
        select >
        {
          stageTaskTypes.length
          ?stageTaskTypes.map(item=>(
            <MenuItem 
              key={item.id_stage_task_type} 
              value={item.id_stage_task_type}>
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
        fullWidth
        label='Días al cambio de etapa'
        type="number"
        defaultValue={values.days}
        {...register('days',{
          required:'Este campo es requerido',
        })}
        error={!!errors.days}
        helperText={errors.days?.message}
        />
      <TextField 
        size="small"
        fullWidth
        label='Número de días en que se aplica'
        type="number"
        defaultValue={values.while_days}
        {...register('while_days',{
          required:'Este campo es requerido',
        })}
        error={!!errors.while_days}
        helperText={errors.while_days?.message}
        />
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
