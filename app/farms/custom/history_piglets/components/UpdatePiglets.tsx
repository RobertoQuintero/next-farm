import {   MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IPiglets } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'

export const UpdatePiglets = () => {
  const {toggleModal} = useContext(UiContext)
  const {piglet,farmsLoading,ubications,postPiglets,updateBirth} = useContext(FarmsContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPiglets>()

  const values={
    ...piglet
  } as IPiglets


  const onSubmit=async(data:IPiglets)=>{
    const newPiglet={...piglet,...data} as IPiglets

    if(piglet?.quantity===Number(newPiglet.quantity)){
      const ok= await postPiglets(newPiglet)
    if(ok){
      toggleModal()
    }
  }else{
    Promise.all([
      postPiglets(newPiglet),
      updateBirth(newPiglet)
    ]).then(res=>{
      toggleModal()
      })

    }
   

    
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Cantidad'
        type="number"
        defaultValue={values.quantity}
        {...register('quantity',{
          required:'Este campo es requerido',
        })}
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
        />
        <TextField
          size="small"
          label='Ubicación'
          fullWidth
          defaultValue={values.id_ubication}
          {...register('id_ubication')} 
          select >
          {
            ubications.length
            ?ubications.map(item=>(
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



