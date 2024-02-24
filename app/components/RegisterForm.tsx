'use client'
import { TextField, MenuItem  } from '@mui/material'
import styles from './components.module.css'
import {  useContext, useState } from 'react'
import { IUser } from '@/interfaces'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/auth/AuthContext'
import { SaveButton } from '.'
import { useUi } from '../context/ui/useUi'


export const RegisterForm = () => {
  const {toggleModal} = useUi()
  const {authLoading,authError,states,postUser} = useContext(AuthContext)
  const [state, setState] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>()

  const onSubmit=async (data:IUser)=>{
    const date=new Date()
    data.id_user=0
    data.id_state=state
    data.id_role=1
    data.is_active=false
    data.status=true
    data.created_at=date
    data.updated_at=date
    data.id_farm=0
    data.is_company=true

    const ok=await postUser(data)
    if(ok){
      toggleModal()

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
          label='Nombre'
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
          label='Estado'
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
      <SaveButton loading={authLoading} title='Registrar'/>
    </form>
  )
}
