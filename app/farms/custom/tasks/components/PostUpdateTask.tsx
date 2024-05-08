import { SaveButton } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IPigTask} from '@/interfaces'
import {  MenuItem, Switch, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateTask = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {pigTypes,farmsLoading,postTask,pigTask,pigStages,stageTaskTypes} = useContext(FarmsContext)

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
    change_to_stage:pigTask?pigTask.change_to_stage:0,
    end_stage:pigTask?pigTask.end_stage:false,
    is_movement_task:pigTask?pigTask.is_movement_task:false,
  } as IPigTask

  const [pigType, setPigType] = useState(pigStages.find( p=>p.id_pig_stage===values.id_pig_stage)?.id_pig_type)
  const [newStages, setNewStages] = useState(pigStages.filter(p=>p.id_pig_type===pigType||p.id_pig_type===4))
  const [pigStage, setpigStage] = useState(values.id_pig_stage)
  const [checked, setChecked] = React.useState(values.end_stage);
  const [isMovement, setIsMovement] = useState(values.is_movement_task)

  const onSubmit=async(data:IPigTask)=>{
    const date= new Date()
    data.created_at=date
    data.id_pig_stage=pigStage
    data.while_days=values.while_days
    const newTask={
      ...values,
      ...data,
      end_stage:checked,
      is_movement_task:isMovement,
      days_diff:0
    } as IPigTask

    if(newTask.id_pig_task){
      newTask.days_diff= Number(data.days)-Number(values.days)
    }
    // return
    const ok=await postTask(newTask)
    if(ok){
      toggleModal()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleMovement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMovement(event.target.checked);
  };

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        size="small"
        label='Tipo cerdo'
        fullWidth
        value={pigType}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setPigType(+e.target.value)
          setNewStages(pigStages.filter(p=>p.id_pig_type===Number(e.target.value)||p.id_pig_type===4))
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
      {/* <TextField 
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
        /> */}
        <div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
        <p>{checked?'Es fin de etapa':'No es fin de etapa'}</p>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </div>
        {
          checked
            ?<TextField
            size="small"
            label='Pasar a etapa'
            fullWidth
            defaultValue={values.change_to_stage|| newStages[0].id_pig_stage}
            {...register('change_to_stage')}
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
          :<></>
        }
        <div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
        <p>{isMovement?'Es de movimiento':'No es de movimiento'}</p>
        <Switch
          checked={isMovement}
          onChange={handleMovement}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
