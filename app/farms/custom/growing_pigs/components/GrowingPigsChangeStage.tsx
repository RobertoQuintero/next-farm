import { SaveButton } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { MenuItem, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

export const GrowingPigsChangeStage = () => {
  const {toggleModal} = useContext(UiContext)
  const {growing_pig,pigStages,farmsLoading,postGrowingPigs,ubications} = useContext(FarmsContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGrowingPigs>()

  const values={
    ...growing_pig
  } as IGrowingPigs

  const onSubmit = async(data:IGrowingPigs) =>{
    // e.preventDefault()
    // if(growing_pig?.id_pig_stage===Number(stage)){
    //   toggleModal()
    //   return
    // }
    const growing={
      ...growing_pig,
      ...data
     } as IGrowingPigs
    //  console.log(growing)
    //  return
     const ok= await postGrowingPigs(growing)
     if(ok){
      toggleModal()
     }
  };

  return (
    <form className='Form' style={{width:'270px'}} onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Cantidad'
        type="number"
        defaultValue={values.quantity}
        {...register('quantity',{min:1})}
        />
      <TextField 
        size="small"
        fullWidth
        label='Peso Promedio'
        type="number"
        defaultValue={values.average_weight}
        {...register('average_weight',{min:1})}
        />
      <TextField
          size="small"
          label='Etapa'
          defaultValue={values.id_pig_stage}
          {...register('id_pig_stage')}
          select >
          {
            pigStages.length
            ?pigStages.filter(p=>p.id_pig_type===2).map(item=>(
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
          label='Ubicación'
          defaultValue={values.id_ubication}
          {...register('id_ubication')}
          select >
          {
            ubications.filter(p=>p.id_pig_type===2).length
            ?ubications.filter(p=>p.id_pig_type===2).map(item=>(
              <MenuItem 
                key={item.id_ubication} 
                value={item.id_ubication}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
