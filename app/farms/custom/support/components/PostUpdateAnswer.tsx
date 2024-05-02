import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IAnswer } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { buildDate } from '@/utils'

export const PostUpdateAnswer = () => {
  const {toggleModal} = useContext(UiContext)
  const {answer,question,farmsLoading,postAnswer} = useContext(FarmsContext)
  const {user} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnswer>()

  const values={
    id_answer:answer?answer.id_answer:0,
    id_question:answer?answer.id_question:question?.id_question,
    description:answer?answer.description:'',
    status:answer?answer.status:true,
    id_user:answer?answer.id_user:user?.id_user,
    created_at:answer?answer.created_at:buildDate(new Date()),
    updated_at:answer?answer.updated_at:buildDate(new Date()),
  } as IAnswer


  const onSubmit=async(data:IAnswer)=>{
    data.description=data.description.trim()
    if(data.description===values.description){
      toggleModal()
      return
    }
    const newAnswer={
      ...values,
      ...data
    } as IAnswer

    const ok= await postAnswer(newAnswer)
    if(ok){
      toggleModal()
    }
  }
  
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Respuesta'
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
