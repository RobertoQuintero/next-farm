'use client'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import styles from './components.module.css'
import { UiContext } from '../context/ui/UiContext'
import {  useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/auth/AuthContext'
import { ICompany } from '@/interfaces'
import { IUser } from '@/interfaces/user'

interface FormData {
  email:string;
  password:string;
}
const types=[
  {id:1,name:'Usuario'},
  {id:2,name:'Compañía'},
]
export const LoginForm = () => {
  const {uiReset} = useContext(UiContext)
  const {loginCompany,authLoading,authError,loginUser} = useContext(AuthContext)
  const [type, setType] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit=async({email,password}:FormData)=>{
    const company={email,password,type}
    if(type===1){
      const ok= await loginUser(company as IUser)
      if(ok){
       uiReset()
     }
    }else{
      const ok= await loginCompany(company as ICompany)
      if(ok){
       uiReset()
     }

    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContainer} >
      <p className={styles.formTitle} >Login</p>
      <TextField
          size="small"
          label='Estados'
          fullWidth
          value={type}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setType(+event.target.value);
          }} 
          select >
          {
            types.length
            ?types.map(item=>(
              <MenuItem 
                key={item.id} 
                value={item.id}>
                {item.name}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
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
