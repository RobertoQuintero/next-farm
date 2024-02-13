import { TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IRace } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'

export const PostUpdateRace = () => {
  const {toggleModal} = useContext(UiContext)
  const {race,farmsLoading,postRace} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRace>()

  const values={
    id_race:race?race.id_race:0,
    status:race?race.status:true,
    id_farm:race?race.id_farm:idFarm,
    description:race?race.description:'',
  } as IRace


  const onSubmit=async(data:IRace)=>{
    const date= new Date()
    data.id_race=values.id_race
    data.status=values.status
    data.id_farm=values.id_farm
    data.created_at=date
    data.updated_at=date
    // console.log(data)
    // return

    const ok = await postRace(data)
    if(ok){
      toggleModal()
    }
  }
  
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
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
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
