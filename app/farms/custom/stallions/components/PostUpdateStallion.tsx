import { SaveButton, SwitchElement } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IStallion } from '@/interfaces'
import {   MenuItem,  TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateStallion = () => {
  const {idFarm} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
  const {stallion,farmsLoading,postStallion,races} = useContext(FarmsContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStallion>()
  
  const values={
    id_stallion:stallion?stallion.id_stallion:0,
    id_farm:stallion?stallion.id_farm:idFarm,
    name:stallion?stallion.name:'',
    status:stallion?stallion.status:true,
    id_ubication:stallion?stallion.id_ubication:0,
    id_race:stallion?stallion.id_race:races[0].id_race,
    is_mix:stallion?stallion.is_mix:false,
  } as IStallion
  const [checked, setChecked] = useState(values.is_mix)


  const onSubmit=async(data:IStallion)=>{
    const newStallion={
      ...values,
      ...data,
      is_mix:checked
    } as IStallion

    // console.log(newStallion)
    // return
    const ok= await postStallion(newStallion)
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
        defaultValue={values.name}
        {...register('name',{
          required:'Este campo es requerido',
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
        />
        <TextField
          size="small"
          label='Raza'
          fullWidth
          defaultValue={values.id_race}
          {...register('id_race')} 
          select >
          {
            races.length
            ?races.map(item=>(
              <MenuItem 
                key={item.id_race} 
                value={item.id_race}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <SwitchElement checked={checked} setChecked={setChecked} text_true='Mezcla' text_false='Normal' />
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}


