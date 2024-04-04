import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IProduct } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { buildDate, buildDateReverse } from '@/utils'

export const PostUpdateProduct = () => {
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,farmsError,product,postProduct} = useContext(FarmsContext)
  const {idFarm} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>()
    
  const values={
    id_product:product?product.id_product:0,
    id_farm:product?product.id_farm:idFarm,
    description:product?product.description:'',
    code:product?product.code:'',
    price:product?product.price:'',
    status:product?product.status:true,
    created_at:product?buildDateReverse(product.created_at as string):buildDate(new Date()),
    updated_at:product?buildDateReverse(product.updated_at as string):buildDate(new Date()),
  } as IProduct


  const onSubmit=async(data:IProduct)=>{
    const newProduct={
      ...values,
      ...data,
      price:Number(data.price)
    } as IProduct

    const ok= await postProduct(newProduct)
    if(ok){
      toggleModal()
    }
  }
  
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Código'
        type="text"
        defaultValue={values.code}
        {...register('code',{
          required:'Este campo es requerido',
        })}
        error={!!errors.code}
        helperText={errors.code?.message}
        />
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
        label='Precio'
        type="number"
        defaultValue={values.price}
        {...register('price')}
        />
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
