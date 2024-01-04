'use client'
import { TextField,Button, CircularProgress, MenuItem  } from '@mui/material'
import styles from './components.module.css'
import {  useContext, useState } from 'react'
import { UiContext } from '../context/ui/UiContext'
import { ICompany } from '@/interfaces'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/auth/AuthContext'


export const RegisterForm = () => {
  const {toggleModal} = useContext(UiContext)
  const {authLoading,authError,states,postCompany} = useContext(AuthContext)
  const [state, setState] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompany>()

  const onSubmit=async (data:ICompany)=>{
    const date=new Date()
    data.id_company=0
    data.id_state=state
    data.id_role=3
    data.is_active=false
    data.status=true
    data.created_at=date
    data.updated_at=date
    console.log(data)
    const ok=await postCompany(data)
    if(ok){
      toggleModal()
      // location.reload()
    }
  }

  return (
    <form 
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
      >
      <p className={styles.formTitle}>Registro</p>
        <TextField
          size='small'
          fullWidth
          label='Nombre Empresa'
          type="text"
          {...register('name',{
          required:'Este campo es requerido',
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          />
        <TextField
          size='small'
          fullWidth
          label='Email'
          type="email"
          {...register('email',{
          required:'Este campo es requerido',
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          />
        <TextField
          size='small'
          fullWidth
          label='Password'
          type="password"
          {...register('password',{
          required:'Este campo es requerido',
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          />
          <TextField
            size='small'
          fullWidth
          label='Dirección'
          type="text"
          {...register('address',{
          required:'Este campo es requerido',
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
          />
        <div className={styles.flexPhone}>
          <TextField
            size='small'
            label='Código Postal'
            type="number"
            {...register('zip',{
          required:'Este campo es requerido',
          })}
          error={!!errors.zip}
          helperText={errors.zip?.message}
            />
          <TextField
            size='small'
            fullWidth
            label='Teléfono'
            type="number"
            {...register('phone',{
          required:'Este campo es requerido',
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
            />
        </div>
        <TextField
          size="small"
          label='Nivel'
          fullWidth
          value={state}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setState(+event.target.value);
          }} 
          select >
          {
            states.length
            ?states.map(item=>(
              <MenuItem 
                key={item.id_state} 
                value={item.id_state}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
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
                :'Registrar'
            }
      </Button> 
    </form>
  )
}
