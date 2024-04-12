import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IComment } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { buildDate } from '@/utils'
import { AuthContext } from '@/app/context/auth/AuthContext'

export const PostUpdateComment = () => {
  const {toggleModal} = useContext(UiContext)
  const {comment,farmsLoading,postComments,pig} = useContext(FarmsContext)
  const {user} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IComment>()

  const values={
    // ...comment,
    id_comment:comment?comment.id_comment:0,
    id_pig:pig?.id_pig,
    description:comment?comment.description:'',
    status:true,
    id_user:comment?comment.id_user:user?.id_user,
  } as IComment


  const onSubmit=async(data:IComment)=>{
    const date= buildDate(new Date())
    const newComment={
      ...values,
      ...data,
      created_at:date,
      updated_at:date,
      id_user:user?.id_user
    } as IComment
    console.log(newComment)
    const ok= await postComments(newComment)
    if(ok){
      toggleModal()
    }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Comentario'
        multiline
        rows={2}
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
