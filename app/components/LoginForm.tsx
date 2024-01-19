'use client'
import { Button, CircularProgress,  TextField } from '@mui/material'
import styles from './components.module.css'
import { UiContext } from '../context/ui/UiContext'
import {  useContext} from 'react'
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/auth/AuthContext'
import { IUser } from '@/interfaces/user'

export const LoginForm = () => {
  const {uiReset} = useContext(UiContext)
  const {authLoading,authError,login} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>()

  const onSubmit=async({email,password}:IUser)=>{
    const user={email,password} as IUser
    const ok= await login(user )
    if(ok){
     uiReset()
   }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContainer} >
      <p className={styles.formTitle} >Login</p>
      <TextField 
        fullWidth
        label='Email'
        placeholder="user@gmail.com" 
        type="email"
        {...register('email',{
          required:'Este campo es requerido',
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        />
      <TextField 
        fullWidth
        label='Password'
        placeholder="******" 
        type="password"
        {...register('password',{
          required:'Este campo es requerido',
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        />
      <p className={styles.errorMessage}>
        {authError?authError:''}
      </p>
      <Button 
          disabled={authLoading}
          type='submit' 
          fullWidth 
          variant='contained'
          >
            {
              authLoading
                ?  <CircularProgress size='1.5rem' />
                :'Login'
            }
      </Button>
    </form>
  )
}
