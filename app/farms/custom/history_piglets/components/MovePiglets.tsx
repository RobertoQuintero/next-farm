
import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IPiglets } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'

export const MovePiglets = () => {
  const {toggleModal} = useContext(UiContext)
  const {ubications,farmsLoading} = useContext(FarmsContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPiglets>()

  const values={
    quantity:0,
    id_ubication:ubications.filter(u=>u.id_pig_type!==2)[0].id_ubication
  } as IPiglets


  const onSubmit=async(data:IPiglets)=>{
    console.log(data)
    // const ok= await post(data)
    // if(ok){
    //   toggleModal()
    // }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Cantidad'
        type="text"
        defaultValue={values.quantity}
        {...register('quantity',{
          required:'Este campo es requerido',
          min:1
        })}
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
        />
        <TextField
          size="small"
          label='Valor'
          fullWidth
          defaultValue={values.id_ubication}
          {...register('id_ubication')} 
          select >
          {
            ubications.filter(u=>u.id_pig_type!==2).length
            ?ubications.filter(u=>u.id_pig_type!==2).map(item=>(
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
