import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { ILoss, IPig, IPiglets } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { buildDate } from '@/utils'
import { useRouter } from 'next/navigation'
import { IGrowingPigs } from '@/interfaces/growing_pigs'

export const LossForm = () => {
  const {toggleModal} = useContext(UiContext)
  const {postLosses,farmsLoading,lossReasons,loss,growing_pig,pig,piglet,postPig,postPiglets,postGrowingPigs} = useContext(FarmsContext)
  const router= useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoss>()

  const values={
    id_loss:loss?loss.id_loss:0,
    id_loss_reason:loss?loss.id_loss_reason:1,
    quantity:loss?loss.quantity:'',
    id_growing_lot:loss?loss.id_growing_lot:growing_pig?growing_pig.id_growing_lot:0,
    id_lot_piglets:loss?loss.id_lot_piglets:piglet?piglet.id_lot_piglets:0,
    id_pig:loss?loss.id_pig:pig?pig.id_pig:0,
    status:loss?loss.status:true,
    comment:loss?loss.comment:'',
    id_pig_type:pig?pig.id_pig_type:piglet?1:2
  } as ILoss


  const onSubmit=async(data:ILoss)=>{
    data.created_at= buildDate(new Date())
    const newLoss={
      ...values,
      ...data,
      quantity:Number(data.quantity)?data.quantity:1
    } as ILoss

    if(pig){
      const newPig={...pig,status:false} as IPig

      Promise.all([
        postLosses(newLoss),
        postPig(newPig)
      ]).then(res=>{
        toggleModal()
        router.back()
        return
      })
    }else if(piglet){
      const newPiglet={
        ...piglet,
        quantity:piglet.quantity-data.quantity
      } as IPiglets
      Promise.all([
        postLosses(newLoss),
        postPiglets(newPiglet)
      ]).then(res=>{
        toggleModal()
        return
      })
    }else if(growing_pig){
      const growing={
        ...growing_pig,
        quantity:growing_pig.quantity-data.quantity
      } as IGrowingPigs

      Promise.all([
        postLosses(newLoss),
        postGrowingPigs(growing)
      ]).then(res=>{
        toggleModal()
        return
      })
    }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        size="small"
        label='Valor'
        fullWidth
        defaultValue={values.id_loss_reason}
        {...register('id_loss_reason')} 
        select >
        {
          lossReasons.length
          ?lossReasons.map(item=>(
            <MenuItem 
              key={item.id_loss_reason} 
              value={item.id_loss_reason}>
              {item.description}
            </MenuItem>
          ))
          :<div></div>
        }
      </TextField>
      <TextField 
        size="small"
        fullWidth
        label='Comentario'
        type="text"
        defaultValue={values.comment}
        {...register('comment')}
        />
      {
        !pig ?<TextField 
        size="small"
        fullWidth
        label='Cantidad'
        type="text"
        defaultValue={values.quantity}
        {...register('quantity',{required:true})}
        />
        :<></>
      }
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
