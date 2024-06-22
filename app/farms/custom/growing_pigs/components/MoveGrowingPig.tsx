import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'

export const MoveGrowingPig = () => {
  const {toggleModal} = useContext(UiContext)
  const {growing_pigs,growing_pig,farmsLoading,postGrowingPigs,getGrowingPigs} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGrowingPigs>()

  const values={
    id_ubication:growing_pigs.filter(g=>g.id_ubication!==growing_pig?.id_ubication)[0].id_ubication
  } as IGrowingPigs


  const onSubmit=async(data:IGrowingPigs)=>{
    const newgrowing={
      ...growing_pig,
      quantity:Number(growing_pig?.quantity) - Number(data.quantity),
      status:!!(Number(growing_pig?.quantity) - Number(data.quantity)),
      closed:!(Number(growing_pig?.quantity) - Number(data.quantity))
    } as IGrowingPigs

    const growing= growing_pigs.find(g=>g.id_ubication===Number(data.id_ubication))
    const newGrowing2={
      ...growing,
      quantity:Number(growing?.quantity)+Number(data.quantity)
    } as IGrowingPigs

    
    Promise.all([
      postGrowingPigs(newGrowing2),
      postGrowingPigs(newgrowing),
    ]).then(async res=>{
      await getGrowingPigs(idFarm!)
      toggleModal()
    })
    
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
          min:1,
          max:growing_pig?.quantity
        })}
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
        />
        <TextField
          size="small"
          label='Mover a'
          fullWidth
          defaultValue={values.id_ubication}
          {...register('id_ubication')} 
          select >
          {
            growing_pigs.filter(g=>g.id_ubication!==growing_pig?.id_ubication).length
            ?growing_pigs.filter(g=>g.id_ubication!==growing_pig?.id_ubication).map(item=>(
              <MenuItem 
                key={item.id_ubication} 
                value={item.id_ubication}>
                {item.ubication}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
