import { UiContext } from '@/app/context/ui/UiContext'
import { UsersContext } from '@/app/context/users/UsersContext'
import { IUser } from '@/interfaces'
import { Button, CircularProgress,  TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'

export const PostPassword = () => {
  const {user,userLoading,postUserPassword} = useContext(UsersContext)
  const {toggleModal} = useContext(UiContext)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit=async(e:SyntheticEvent)=>{
    e.preventDefault()
    setError(undefined)
    if(password!==confirmPassword){
      setError('No son iguales')
    }else{
      const newUser={...user,password} as IUser
      const ok= await postUserPassword(newUser)
      if(ok){
        toggleModal()
      }
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
     if(event.target.name==='password'){
      setPassword(event.target.value)
    }else{
       setConfirmPassword(event.target.value)
     }
  };

  return (
    <form className='Form' onSubmit={onSubmit}>
      <TextField 
        size="small"
        fullWidth
        label='Password'
        type="text"
        value={password}
        name='password'
        onChange={onChange}
        />
      <TextField 
        size="small"
        fullWidth
        label='Confirmar Password'
        type="text"
        value={confirmPassword}
        name='confirm'
        onChange={onChange}
        />
        {error?<p style={{textAlign:'center',color:'red',fontSize:'14px'}}>{error}</p>:<></>}
        <Button 
          size="small"
          disabled={userLoading}
          type='submit' 
          fullWidth 
          variant='contained'
          >
            {
              userLoading
                ?  <CircularProgress size='1.5rem' />
                :'Guardar'
            }
      </Button>
    </form>
  )
}
