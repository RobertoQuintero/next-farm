import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IQuestion } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { buildDate } from '@/utils'

export const PostUpdateQuestion = () => {
  const {toggleModal} = useContext(UiContext)
  const {idFarm,user} = useContext(AuthContext)
  const {question,farmsLoading,postQuestion} = useContext(FarmsContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IQuestion>()

  const values={
    id_question:question?question.id_question:0,
    id_farm:question?question.id_farm:idFarm,
    id_user:question?question.id_user:user?.id_user,
    description:question?question.description:'',
    status:question?question.status:true,
    created_at:question?question.created_at:buildDate(new Date()),
    updated_at:question?question.updated_at:buildDate(new Date()),
  } as IQuestion


  const onSubmit=async(data:IQuestion)=>{
    if(data.description.trim()===values.description){
      toggleModal()
      return
    }
    data.description=data.description.trim()
    const newQuestion={
      ...values,
      ...data
    } as IQuestion

    // console.log(newQuestion)
    // return

    const ok= await postQuestion(newQuestion)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Pregunta'
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
