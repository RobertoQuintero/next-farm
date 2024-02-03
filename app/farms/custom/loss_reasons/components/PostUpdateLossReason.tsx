

import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { ILossReason } from '@/interfaces'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateLossReason = () => {
  const {toggleModal} = useContext(UiContext)
  const {lossReason,farmsLoading,postLossReason} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILossReason>()

  const values={
    id_loss_reason:lossReason?lossReason.id_loss_reason:0,
    description:lossReason?lossReason.description:'',
    status:lossReason?lossReason.status:true,
    id_farm:lossReason?lossReason.id_farm:idFarm,
  } as ILossReason


  const onSubmit=async(data:ILossReason)=>{
    const date= new Date()
    data.id_loss_reason=values.id_loss_reason
    data.status= values.status
    data.id_farm=values.id_farm
    data.created_at=date
    data.updated_at=date
    console.log(data)
    // return
    const ok=await postLossReason(data)
    if(ok){
      toggleModal()
    }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
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
