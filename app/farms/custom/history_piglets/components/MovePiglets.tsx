
import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IPiglets } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'

export const MovePiglets = () => {
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,piglets,piglet,postPiglets,movePiglets} = useContext(FarmsContext)
  const ubication=piglets.filter(p=>p.id_lot_piglets!==piglet?.id_lot_piglets)[0]?.id_lot_piglets
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPiglets>()

  const values={
    quantity:0,
    id_ubication:ubication
  } as IPiglets
  const onSubmit=async(data:IPiglets)=>{

    const newPiglets={
      ...piglet,
      quantity:piglet!.quantity-data.quantity
    } as IPiglets
    const newMovingPiglet=piglets.find(p=>p.id_lot_piglets===Number(data.id_ubication))!
    const movingPiglets={
      ...newMovingPiglet,
      quantity: newMovingPiglet.quantity+Number(data.quantity)
    } as IPiglets

    Promise.all([
      postPiglets(newPiglets),
      movePiglets(movingPiglets),
    ]).then(async res=>{

      toggleModal()
    })

  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Cantidad'
        type="text"
        defaultValue={values.quantity||''}
        {...register('quantity',{
          required:'Este campo es requerido',
          min:1,
          max:piglet?.quantity
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
            piglets.filter(p=>p.id_lot_piglets!==piglet?.id_lot_piglets).length
            ?piglets.filter(p=>p.id_lot_piglets!==piglet?.id_lot_piglets).map(item=>(
              <MenuItem 
                key={item.id_lot_piglets} 
                value={item.id_lot_piglets}>
                {item.ubication}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <SaveButton loading={farmsLoading || !ubication}/>
    </form>
  )
}
