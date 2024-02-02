import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IStage } from '@/interfaces'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateStage = () => {
  const {stage, pigTypes,farmsLoading,stages,postStage} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStage>()

  const values={
    id_stage:stage?stage.id_stage:0,
    id_pig_type:stage?stage.id_pig_type:1,
    description:stage?stage.description:'',
    status:stage?stage.status:true,
    order:stage?stage.order:0,
    min_weight:stage?stage.min_weight:0,
    max_weight:stage?stage.max_weight:0,
    food_amount:stage?stage.food_amount:0,
    id_farm:stage?stage.id_farm:idFarm|| localStorage.getItem('id_farm'),
  } as IStage


  const onSubmit=async(data:IStage)=>{
    data.status=values.status
    data.id_stage=values.id_stage
    data.id_farm=values.id_farm
    data.order= Number(values.order)
                  ?values.order 
                  : stages.filter(s=>s.id_pig_type===Number(data.id_pig_type)).reduce((max,num)=> num.order>max?num.order:max,0)+1
    
    const ok= await postStage(data)
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
          defaultValue={values.id_pig_type}
          {...register('id_pig_type')} 
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
        fullWidth
        label='Descripción'
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
        label='Peso mínimo'
        type="number"
        defaultValue={values.min_weight}
        {...register('min_weight',{
          required:'Este campo es requerido',
          min:0
        })}
        error={!!errors.min_weight}
        helperText={errors.min_weight?.message}
        />
      <TextField 
        size="small"
        fullWidth
        label='Peso máximo'
        type="number"
        defaultValue={values.max_weight}
        {...register('max_weight',{
          required:'Este campo es requerido',
          min:0
        })}
        error={!!errors.max_weight}
        helperText={errors.max_weight?.message}
        />
      <TextField 
        size="small"
        fullWidth
        label='Consumo'
        type="number"
        defaultValue={values.food_amount}
        {...register('food_amount',{
          required:'Este campo es requerido',
          min:0
        })}
        error={!!errors.food_amount}
        helperText={errors.food_amount?.message}
        />
        <Button 
          size="small"
          disabled={farmsLoading}
          type='submit' 
          fullWidth 
          variant='contained'
          >
            {
              farmsLoading
                ?  <CircularProgress size='1.5rem' />
                :'Guardar'
            }
      </Button>
    </form>
  )
}
